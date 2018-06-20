import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Episode } from '../../../interfaces/episode';
import { EpisodesService } from '../services/episodes.service';

@Component({
  selector: 'app-episode',
  template: `
    <mat-card [style.background-image]="backgroundImageCSS">
      <app-player [episode]="episode"></app-player>
      <h2>{{episode.created_at | date: 'shortDate'}} | {{episode.title}} |
        {{episode.duration | date: 'H:mm:ss' : '+0000'}}</h2>
      <p>{{episode.description}}</p>
      <section [hidden]="!episode.showNotesHTML && isReadOnly">
        <h3 [hidden]="isEditing">Show Notes</h3>
        <div [innerHTML]="episode.showNotesHTML"></div>
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
  public backgroundImageCSS: string;
  public isEditing: boolean;
  public editForm: FormGroup;

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
