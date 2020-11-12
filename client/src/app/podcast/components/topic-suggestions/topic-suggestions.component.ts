import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TopicSuggestion } from '../../../../interfaces/topic-suggestion';

@Component({
  selector: 'app-topic-suggestions',
  template: `
    <div fxFill *ngIf="isBusy" class="busy-wrapper" fxLayout="row" fxLayoutAlign="center center">
      <mat-spinner></mat-spinner>
    </div>
    <section fxLayout="column" fxLayoutAlign="space-between stretch" fxFill>
      <button mat-button *ngIf="canShowAll" (click)="handleShowAll()">Show All</button>
      <mat-list dense>
        <mat-list-item *ngFor="let suggestion of suggestions"
                       matTooltip="{{suggestion.topic}}{{suggestion.isMyVote ? ' (Already Voted)' : ''}}"
                       matTooltipPosition="above"
                       matTooltipShowDelay="1000"
                       matBadge="{{suggestion.votes}}"
                       matBadgeColor="accent"
                       matBadgePosition="above before">
          <span matLine>{{suggestion.topic | case}}</span>
          <button mat-icon-button (click)="handleVote(suggestion)" [disabled]="suggestion.isMyVote">
            <i class="fad fa-thumbs-up"></i>
          </button>
        </mat-list-item>
      </mat-list>
      <ng-container *ngIf="!!completeSuggestions.length">
        <mat-divider></mat-divider>
        <h4 class="complete mat-subheading-1">Completed</h4>
        <mat-list dense class="complete">
          <mat-list-item *ngFor="let suggestion of completeSuggestions"
                         matBadge="{{suggestion.votes}}"
                         matBadgePosition="above before">
            <span matLine>{{suggestion.topic}}</span>
          </mat-list-item>
        </mat-list>
      </ng-container>
      <button mat-button *ngIf="!isAdding"
              color="primary"
              (click)="toggleAdding()">Suggest a topic!
      </button>
      <form [formGroup]="form" (ngSubmit)="handleSubmit()" fxLayout="column"
            *ngIf="isAdding">
        <mat-form-field>
          <mat-label>Topic</mat-label>
          <input #topicInput type="text" [formControl]="topicControl" autocomplete="false"
                 matInput placeholder="Enter your suggestion...">
        </mat-form-field>
        <footer fxLayout="row" fxLayoutAlign="space-between">
          <button mat-button type="reset" (click)="toggleAdding()" color="warn">Cancel</button>
          <button mat-button [disabled]="form.invalid || isBusy">Submit</button>
        </footer>
      </form>
    </section>
  `,
  styleUrls: ['./topic-suggestions.component.scss']
})
export class TopicSuggestionsComponent implements OnInit, OnChanges {
  public topicControl: FormControl;
  public form: FormGroup;
  public isAdding: boolean;
  @Input()
  public canShowAll: boolean;
  @Input()
  public suggestions: TopicSuggestion[];
  @Input()
  public completeSuggestions: TopicSuggestion[];
  @Input()
  public isBusy: boolean;
  @Output()
  public topicSubmit = new EventEmitter<string>();
  @Output()
  public vote = new EventEmitter<TopicSuggestion>();
  @Output()
  public showAll = new EventEmitter();
  @ViewChild('topicInput')
  public topicInput: ElementRef;

  constructor(private formBuilder: FormBuilder) {
    this.topicControl = new FormControl(undefined, [Validators.required, Validators.maxLength(500)]);
    this.form = this.formBuilder.group({
      topic: this.topicControl
    });
  }

  public ngOnInit() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.isBusy) {
      changes.isBusy.currentValue ? this.topicControl.disable() : this.topicControl.enable();
    }
  }

  public handleSubmit(): void {
    this.topicSubmit.emit(this.topicControl.value);
    this.toggleAdding();
  }

  public handleVote(topicSuggestion: TopicSuggestion): void {
    this.vote.emit(topicSuggestion);
  }

  public handleShowAll(): void {
    this.showAll.emit();
  }

  public toggleAdding(): void {
    this.isAdding = !this.isAdding;
    if (!this.isAdding) {
      this.topicControl.reset(undefined);
      this.form.reset();
    } else {
      setTimeout(() => {
        try {
          this.topicInput.nativeElement.focus();
        } catch (e) {
          console.log(e);
        }
      }, 500);
    }
  }
}
