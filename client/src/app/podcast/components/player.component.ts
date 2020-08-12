import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Episode } from '../../../interfaces/episode';

@Component({
  selector: 'app-player',
  template: `
    <canvas #waveformCanvas height="50"></canvas>
    <div class="controls">
      <button mat-icon-button mat-raised-button
              color="accent"
              (click)="togglePlayPause($event)">
        <mat-icon color="primary" *ngIf="!isPlaying">play_arrow</mat-icon>
        <mat-icon color="primary" *ngIf="isPlaying">pause</mat-icon>
      </button>
      <h5 class="mat-h5">{{currentTime}}</h5>
    </div>
    <audio #audioElement></audio>`,
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnChanges, AfterViewInit {
  @Input()
  public episode: Episode;
  @Input()
  public innerColor = 'rgba(0,0,0,0.3)';
  @Input()
  public playedColor = '#5E3FB5';
  @Input()
  public outerColor = 'transparent';

  @ViewChild('audioElement', { static: true })
  public audioElementRef: ElementRef;
  @ViewChild('waveformCanvas', { static: true })
  public waveformCanvasRef: ElementRef;

  @Output()
  public isPlayingChange = new EventEmitter<boolean>();
  public currentTime: string;
  private _isPlaying: boolean;
  private isInitialized: boolean;
  private audioElement: HTMLAudioElement;
  private waveformContext: CanvasRenderingContext2D;
  private waveformData: number[];
  private resizeSubject = new Subject<any>();
  private resizeObservable = this.resizeSubject.asObservable()
                                 .pipe(debounceTime(100));

  constructor(private hostElementRef: ElementRef) { }

  public get isPlaying(): boolean {
    return this._isPlaying;
  }

  @Input()
  public set isPlaying(value: boolean) {
    if (value !== this._isPlaying) {
      this._isPlaying = value;
      this.togglePlayPause();
    }
  }

  @HostListener('window:resize', ['$event'])
  public onResize(ev: any) {
    this.resizeSubject.next(ev);
  }

  @HostListener('click', ['$event.offsetX'])
  public onClick(offsetX: number) {
    if (offsetX > 0) {
      this.seek(offsetX);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.episode && !!changes.episode.currentValue) {
      this.init();
    }
  }

  public ngAfterViewInit(): void {
    this.init();
  }

  public async togglePlayPause(ev?: Event): Promise<any> {
    if (!!ev) {
      ev.stopPropagation();
    }
    try {
      if (this.audioElement.paused) {
        await this.audioElement.play();
      } else {
        await this.audioElement.pause();
      }
      this.isPlayingChange.emit(!this.audioElement.paused);
    } catch (e) {
      console.warn(e);
    }
    this.updateUI();
  }

  private init(): void {
    if (!this.isInitialized && !!this.episode && this.episode.streamable
        && !!this.audioElementRef && !!this.audioElementRef.nativeElement) {
      this.isInitialized = true;
      this.audioElement = this.audioElementRef.nativeElement as HTMLAudioElement;
      this.audioElement.addEventListener('timeupdate', () => {
        this.updateUI();
      });
      this.audioElement.src = `${this.episode.streamUrl}?client_id=${environment.soundCloudId}`;
    }

    if (!this.waveformContext && !!this.waveformCanvasRef.nativeElement) {

      this.drawWaveform();
      this.resizeObservable.subscribe(() => this.updateUI());
    }
    this.updateUI();
  }

  private updateUI(): void {
    this._isPlaying = !this.audioElement.paused;
    this.currentTime = this.prettyTime(this.audioElement.currentTime);
    this.drawWaveform();
  }

  private drawWaveform(): void {
    if (!this.waveformCanvasRef.nativeElement || !this.episode || !this.episode.waveform) {
      return;
    }
    const canvasElement = this.waveformCanvasRef.nativeElement as HTMLCanvasElement;
    canvasElement.width = this.hostElementRef.nativeElement.offsetWidth;
    this.waveformContext = canvasElement.getContext('2d');
    const width = this.waveformCanvasRef.nativeElement.clientWidth;
    const height = this.waveformCanvasRef.nativeElement.height;
    this.waveformData = this.interpolateWaveformData(this.episode.waveform.samples, width);

    this.waveformContext.clearRect(0, 0, width, height);

    const middle = height / 2;
    let percentPlayed = 0;
    if (!isNaN(this.audioElement.duration) && this.audioElement.currentTime > 0) {
      percentPlayed = this.audioElement.currentTime / this.audioElement.duration;
    }
    for (let index = 0; index < this.waveformData.length; index++) {
      const barHeight = this.waveformData[index] * height;
      const y = middle - (barHeight / 2);
      if ((index / this.waveformData.length) < percentPlayed) {
        this.waveformContext.fillStyle = this.playedColor;
      } else {
        this.waveformContext.fillStyle = this.innerColor;
      }
      this.waveformContext.fillRect(index, y, 1, barHeight);
    }
  }

  private interpolateWaveformData(data: number[], width: number): number[] {
    const returnValue = new Array<number>(width);
    const maxValue = Math.max(...data);
    for (let i = 1; i <= width; i++) {
      const percent = i / width;
      const sourceIndex = Math.floor(data.length * percent);
      returnValue[i] = data[sourceIndex] / maxValue;
    }
    return returnValue;
  }

  private prettyTime(value): string {
    const hours = Math.floor(value / 3600);
    let mins = '0' + Math.floor((value % 3600) / 60);
    let secs = '0' + Math.floor((value % 60));
    mins = mins.substr(mins.length - 2);
    secs = secs.substr(secs.length - 2);
    if (!isNaN(parseInt(secs, 10))) {
      if (hours) {
        return hours + ':' + mins + ':' + secs;
      } else {
        return mins + ':' + secs;
      }
    } else {
      return '00:00';
    }
  }

  private async seek(locationX: number): Promise<any> {
    if (!this.audioElement) {
      return;
    }
    if (this.audioElement.paused) {
      await this.togglePlayPause();
    }
    const canvasElement = this.waveformCanvasRef.nativeElement as HTMLCanvasElement;
    const percentToSeek = locationX / canvasElement.width;
    if (!isNaN(this.audioElement.duration)) {
      this.audioElement.currentTime = this.audioElement.duration * percentToSeek;
    }
    this.updateUI();
  }
}
