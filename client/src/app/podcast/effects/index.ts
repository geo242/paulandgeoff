import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Episode } from '../../../interfaces/episode';
import { TopicSuggestion } from '../../../interfaces/topic-suggestion';
import {
  AddTopicSuggestionAction, AddTopicSuggestionFailAction, AddTopicSuggestionSuccessAction,
  GetFailAction,
  GetSuccessAction, GetTopicSuggestionsAction, GetTopicSuggestionsFailAction, GetTopicSuggestionsSuccessAction,
  PodcastActionType, TopicVoteAction, TopicVoteFailAction, TopicVoteSuccessAction,
  UpdateShowNotesAction, UpdateShowNotesFailAction,
  UpdateShowNotesSuccessAction
} from '../actions';
import { EpisodesService } from '../services/episodes.service';
import { TopicSuggestionsService } from '../services/topic-suggestions.service';

@Injectable()
export class PodcastEffects {
  constructor(private actions$: Actions,
              private episodes: EpisodesService,
              private topicSuggestions: TopicSuggestionsService) {

  }

  @Effect()
  public get$ = this.actions$.pipe(
    ofType(PodcastActionType.GET),
    switchMap(() => this.episodes.list().pipe(
      map((episodes: Episode[]) => new GetSuccessAction(episodes)),
      catchError(() => of(new GetFailAction()))
    ))
  );

  @Effect()
  public updateShowNotes$ = this.actions$.pipe(
    ofType(PodcastActionType.UPDATE_SHOW_NOTES),
    switchMap((action: UpdateShowNotesAction) =>
      this.episodes.updateShowNotes(action.episodeId, action.newShowNotes).pipe(
        map((episode: Episode) => new UpdateShowNotesSuccessAction(episode)),
        catchError(() => of(new UpdateShowNotesFailAction()))
      ))
  );

  @Effect()
  public getTopicSuggestions$ = this.actions$.pipe(
    ofType(PodcastActionType.GET_TOPIC_SUGGESTIONS),
    switchMap((action: GetTopicSuggestionsAction) => this.topicSuggestions.list().pipe(
      map((topicSuggestions: TopicSuggestion[]) => new GetTopicSuggestionsSuccessAction(topicSuggestions)),
      catchError((error: Error) => of(new GetTopicSuggestionsFailAction(error)))
    ))
  );

  @Effect()
  public addTopic$ = this.actions$.pipe(
    ofType(PodcastActionType.ADD_TOPIC_SUGGESTION),
    switchMap((action: AddTopicSuggestionAction) => this.topicSuggestions.add(action.topic).pipe(
      map((topicSuggestion: TopicSuggestion) => new AddTopicSuggestionSuccessAction(topicSuggestion)),
      catchError((error: Error) => of(new AddTopicSuggestionFailAction(error)))
    ))
  );

  @Effect()
  public vote$ = this.actions$.pipe(
    ofType(PodcastActionType.TOPIC_VOTE),
    switchMap((action: TopicVoteAction) => this.topicSuggestions.vote(action.topicSuggestion).pipe(
      switchMap((topicSuggestion: TopicSuggestion) => of(
        new TopicVoteSuccessAction(topicSuggestion),
        new GetTopicSuggestionsAction()
      )),
      catchError((error: Error) => of(new TopicVoteFailAction(error)))
    ))
  );
}
