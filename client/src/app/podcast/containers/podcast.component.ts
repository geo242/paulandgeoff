import { Component, QueryList, ViewChildren } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Episode } from '../../../interfaces/episode';
import { TopicSuggestion } from '../../../interfaces/topic-suggestion';
import { selectCurrentUserIsAdmin } from '../../authentication/reducers';
import { State } from '../../reducers/main';
import {
  AddTopicSuggestionAction,
  GetAction,
  GetTopicSuggestionsAction, ShowAllTopicSuggestionsAction,
  TopicVoteAction,
  UpdateShowNotesAction
} from '../actions';
import { EpisodeComponent } from '../components/episode.component';
import {
  selectEpisodes,
  selectIsTopicSuggestionsBusy,
  selectShowShowAllButton,
  selectTopicSuggestions
} from '../reducers';

@Component({
  selector: 'app-podcast',
  template: `
    <header>
      <div fxLayout="row" fxLayout.xs="column" fxLayoutAlign.xs="center center" fxLayoutAlign="space-around">
        <div class="main__logo">
          <img class="main__logo-image" alt="Paul &amp; Geoff Logo"
               src="../assets/img/paul-and-geoff-logo.svg">
        </div>
        <app-topic-suggestions
          class="mat-elevation-z2"
          [isBusy]="isTopicSuggestionsBusy$ | async"
          [suggestions]="topicSuggestions$ | async"
          [canShowAll]="showShowAllButton$ | async"
          (showAll)="handleShowAll()"
          (vote)="handleVote($event)"
          (topicSubmit)="handleTopicSubmitted($event)"></app-topic-suggestions>
      </div>

      <h3 class="mat-subheading-2">
        A podcast about finding a topic to make a podcast about.
      </h3>
      <h4 class="mat-caption">Created by Paul Bredenberg and Geoff Tripoli.</h4>

    </header>

    <app-episode *ngFor="let episode of episodes$ | async"
                 [isReadOnly]="!(isCurrentUserAdmin$ | async)"
                 (updateShowNotes)="handleUpdateShowNotes(episode, $event)"
                 (isPlayingChange)="handlePlayStateChanged(episode, $event)"
                 [episode]="episode"></app-episode>`,
  styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent {
  public episodes$: Observable<Episode[]>;
  public isCurrentUserAdmin$: Observable<boolean>;
  public isTopicSuggestionsBusy$: Observable<boolean>;
  public topicSuggestions$: Observable<TopicSuggestion[]>;
  public showShowAllButton$: Observable<boolean>;

  @ViewChildren(EpisodeComponent)
  public episodeComponents: QueryList<EpisodeComponent>;

  constructor(private store: Store<State>) {
    this.episodes$ = this.store.pipe(select(selectEpisodes));
    this.isCurrentUserAdmin$ = this.store.pipe(select(selectCurrentUserIsAdmin));
    this.isTopicSuggestionsBusy$ = this.store.pipe(select(selectIsTopicSuggestionsBusy));
    this.topicSuggestions$ = this.store.pipe(select(selectTopicSuggestions));
    this.showShowAllButton$ = this.store.pipe(select(selectShowShowAllButton));
    this.store.dispatch(new GetAction());
    this.store.dispatch(new GetTopicSuggestionsAction());
  }

  public handleUpdateShowNotes(episode: Episode, newShowNotes: string): void {
    this.store.dispatch(new UpdateShowNotesAction(episode.episodeId, newShowNotes));
  }

  public handlePlayStateChanged(episode: Episode, isPlaying: boolean): void {
    if (isPlaying) {
      this.episodeComponents.forEach((episodeComponent: EpisodeComponent) => {
        if (episodeComponent.episode !== episode) {
          episodeComponent.isPlaying = false;
        }
      });
    }
  }

  public handleVote(topicSuggestion: TopicSuggestion): void {
    this.store.dispatch(new TopicVoteAction(topicSuggestion));
  }

  public handleTopicSubmitted(topic: string): void {
    this.store.dispatch(new AddTopicSuggestionAction(topic));
  }

  public handleShowAll(): void {
    this.store.dispatch(new ShowAllTopicSuggestionsAction())
  }
}
