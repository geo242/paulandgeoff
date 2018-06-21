import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Episode } from '../../../interfaces/episode';
import { EpisodesService } from '../services/episodes.service';

@Component({
  selector: 'app-episode',
  template: `
    <mat-card>
      <app-player [episode]="episode" [(isPlaying)]="isPlaying"></app-player>
      <div class="mat-card-content">
        <h2 class="mat-headline">{{episode.created_at | date: 'shortDate'}} | {{episode.title}} |
          {{episode.duration | date: 'H:mm:ss' : '+0000'}}</h2>
        <p class="description mat-body-2">{{episode.description}}</p>
        <section class="show-notes" [hidden]="!episode.showNotesHTML && isReadOnly">
          <h3 class="mat-subheading-1" [hidden]="isEditing">Show Notes</h3>
          <div class="show-notes--body mat-body-1" [innerHTML]="episode.showNotesHTML"></div>
          <form [formGroup]="editForm"
                fxLayout="column"
                fxLayoutAlign="start stretch"
                *ngIf="!isReadOnly" (ngSubmit)="save()">
            <mat-form-field *ngIf="isEditing">
              <textarea matInput formControlName="showNotes" placeholder="Show Notes"></textarea>
            </mat-form-field>
            <div fxLayout="row" fxLayoutAlign="space-between center">
              <button type="button" mat-button (click)="toggleEditing()">
                {{isEditing ? 'Cancel' : 'Edit'}}
              </button>
              <button type="submit" mat-button *ngIf="isEditing">
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </mat-card>`,
  styleUrls: ['./episode.component.scss'],
  host: {
    'class': 'episode'
  }
})
export class EpisodeComponent implements OnChanges {
  @Input()
  public episode: Episode;
  @Input()
  public isReadOnly: boolean = true;
  @Output()
  public updateShowNotes = new EventEmitter<string>();
  @Output()
  public isPlayingChange = new EventEmitter<boolean>();

  @Input()
  public set isPlaying(value: boolean) {
    if (value !== this._isPlaying) {
      this._isPlaying = value;
      this.isPlayingChange.emit(this.isPlaying);
    }
  };

  public get isPlaying(): boolean {
    return this._isPlaying;
  }

  public backgroundImageCSS: string;
  public isEditing: boolean;
  public editForm: FormGroup;

  private _isPlaying: boolean;

  constructor(private episodesService: EpisodesService,
              private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      showNotes: new FormControl()
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.episode && !!changes.episode.currentValue) {
      this.backgroundImageCSS = `url(${changes.episode.currentValue.waveform_url})`;
      this.editForm.controls.showNotes.setValue(changes.episode.currentValue.showNotes);
    }
  }

  public toggleEditing(): void {
    this.isEditing = !this.isEditing;
  }

  public save(): void {
    this.updateShowNotes.emit(this.editForm.controls.showNotes.value);
    this.isEditing = false;
  }
}
