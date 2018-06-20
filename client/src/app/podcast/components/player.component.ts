import {
  AfterViewInit,
  Component,
  ElementRef, HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Episode } from '../../../interfaces/episode';

@Component({
  selector: 'app-player',
  template: `
    <div class="controls">
      <button mat-icon-button mat-raised-button (click)="togglePlayPause()">
        <mat-icon *ngIf="!isPlaying">play_arrow</mat-icon>
        <mat-icon *ngIf="isPlaying">pause</mat-icon>
      </button>
      <h5>{{currentTime}}</h5>
    </div>
    <canvas #waveformCanvas></canvas>
    <audio #audioElement></audio>`,
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  public episode: Episode;
  @Input()
  public innerColor: string = '#000000';
  @Input()
  public outerColor: string = 'transparent';

  @ViewChild('audioElement')
  public audioElementRef: ElementRef;
  @ViewChild('waveformCanvas')
  public waveformCanvasRef: ElementRef;

  public isPlaying: boolean;
  public currentTime: string;

  private isInitialized: boolean;
  private audioElement: HTMLAudioElement;
  private waveformContext: CanvasRenderingContext2D;
  private waveformData: number[];
  private resizeSubject = new Subject<number>();
  private resizeObservable = this.resizeSubject.asObservable()
                                 .pipe(debounceTime(500));

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  public onResize(width: number) {
    this.resizeSubject.next(width);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.episode && !!changes.episode.currentValue) {
      this.init();
    }
  }

  public ngAfterViewInit(): void {
    this.init();
  }

  public async togglePlayPause(): Promise<any> {
    try {
      if (this.audioElement.paused) {
        await this.audioElement.play();
        console.log('Playing', this.prettyTime(this.audioElement.currentTime));
      } else {
        await this.audioElement.pause();
        console.log('Paused', this.prettyTime(this.audioElement.currentTime));
      }
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
      this.audioElement.src = `${this.episode.stream_url}?client_id=${environment.soundCloudId}`;
    }

    if (!this.waveformContext && !!this.waveformCanvasRef.nativeElement) {
      const canvasElement = this.waveformCanvasRef.nativeElement as HTMLCanvasElement;
      this.waveformContext = canvasElement.getContext('2d');

      this.drawWaveform();
      this.resizeObservable
        .subscribe(() => {
          this.drawWaveform();
        })
    }
  }

  private updateUI(): void {
    this.isPlaying = !this.audioElement.paused;
    this.currentTime = this.prettyTime(this.audioElement.currentTime);
  }

  private drawWaveform(): void {
    if (!this.waveformContext || !this.episode || !this.episode.waveform_data) {
      return;
    }
    const width = this.waveformCanvasRef.nativeElement.clientWidth;
    const height = this.waveformCanvasRef.nativeElement.height;
    this.waveformData = this.interpolateWaveformData(this.episode.waveform_data.samples, width);

    this.waveformContext.fillStyle = this.outerColor;
    this.waveformContext.clearRect(0, 0, width, height);
    this.waveformContext.fillRect(0, 0, width, height);


    this.waveformContext.fillStyle = this.innerColor;

    const middle = height / 2;
    let _ref = this.waveformData;
    let _len = _ref.length;
    let i = 0;

    for (let _i = 0, _len = _ref.length; _i < _len; _i++) {
      let d = _ref[_i] * .007;
      let t = width / this.waveformData.length;
      let x = t * i;
      let y = middle - middle * d;
      let w = t;
      let h = middle * d * 2;
      this.waveformContext.clearRect(x, y, w, h);
      this.waveformContext.fillRect(x, y, w, h);
      i++;
    }
  }

  private interpolateWaveformData(data, fitCount) {
    let after, atPoint, before, i, newData, springFactor, tmp;
    newData = [];
    springFactor = Number((data.length - 1) / (fitCount - 1));
    newData[0] = data[0];
    i = 1;
    while (i < fitCount - 1) {
      tmp = i * springFactor;
      before = Number(Math.floor(tmp)).toFixed();
      after = Number(Math.ceil(tmp)).toFixed();
      atPoint = tmp - before;
      newData[i] = this.linearInterpolate(data[before], data[after], atPoint);
      i++;
    }
    newData[fitCount - 1] = data[data.length - 1];
    return newData;
  }

  private linearInterpolate(before, after, atPoint) {
    return before + (after - before) * atPoint;
  }

  private prettyTime(value): string {
    let hours = Math.floor(value / 3600),
        mins  = '0' + Math.floor((value % 3600) / 60),
        secs  = '0' + Math.floor((value % 60));
    mins = mins.substr(mins.length - 2);
    secs = secs.substr(secs.length - 2);
    if (!isNaN(parseInt(secs))) {
      if (hours) {
        return hours + ':' + mins + ':' + secs;
      } else {
        return mins + ':' + secs;
      }
    } else {
      return '00:00';
    }
    ;
  };
}
