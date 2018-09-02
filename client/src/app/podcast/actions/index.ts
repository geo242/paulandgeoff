import { Action } from '@ngrx/store';
import { Episode } from '../../../interfaces/episode';
import { TopicSuggestion } from '../../../interfaces/topic-suggestion';

export enum PodcastActionType {
  GET                           = '[Podcast] Get',
  GET_SUCCESS                   = '[Podcast] Get Success',
  GET_FAIL                      = '[Podcast] Get Fail',
  UPDATE_SHOW_NOTES             = '[Podcast] Update Show Notes',
  UPDATE_SHOW_NOTES_SUCCESS     = '[Podcast] Update Show Notes Success',
  UPDATE_SHOW_NOTES_FAIL        = '[Podcast] Update Show Notes Fail',
  GET_TOPIC_SUGGESTIONS         = '[Podcast] Get Topic Suggestions',
  GET_TOPIC_SUGGESTIONS_SUCCESS = '[Podcast] Get Topic Suggestions Success',
  GET_TOPIC_SUGGESTIONS_FAIL    = '[Podcast] Get Topic Suggestions Fail',
  ADD_TOPIC_SUGGESTION          = '[Podcast] Add Topic Suggestion',
  ADD_TOPIC_SUGGESTION_SUCCESS  = '[Podcast] Add Topic Suggestion Success',
  ADD_TOPIC_SUGGESTION_FAIL     = '[Podcast] Add Topic Suggestion Fail',
  TOPIC_VOTE                    = '[Podcast] Topic Vote',
  TOPIC_VOTE_SUCCESS            = '[Podcast] Topic Vote Success',
  TOPIC_VOTE_FAIL               = '[Podcast] Topic Vote Fail',
  SHOW_ALL_TOPIC_SUGGESTIONS    = '[Podcast] Show All Topic Suggestions'
}

export class GetAction implements Action {
  public readonly type = PodcastActionType.GET;
}

export class GetSuccessAction implements Action {
  public readonly type = PodcastActionType.GET_SUCCESS;

  constructor(public episodes: Episode[]) {}
}

export class GetFailAction implements Action {
  public readonly type = PodcastActionType.GET_FAIL;
}

export class UpdateShowNotesAction implements Action {
  public readonly type = PodcastActionType.UPDATE_SHOW_NOTES;

  constructor(public episodeId: number, public newShowNotes: string) {

  }
}

export class UpdateShowNotesSuccessAction implements Action {
  public readonly type = PodcastActionType.UPDATE_SHOW_NOTES_SUCCESS;

  constructor(public episode: Episode) {

  }
}

export class UpdateShowNotesFailAction implements Action {
  public readonly type = PodcastActionType.UPDATE_SHOW_NOTES_FAIL;
}

export class GetTopicSuggestionsAction implements Action {
  public readonly type = PodcastActionType.GET_TOPIC_SUGGESTIONS;
}

export class GetTopicSuggestionsSuccessAction implements Action {
  public readonly type = PodcastActionType.GET_TOPIC_SUGGESTIONS_SUCCESS;

  constructor(public topicSuggestions: TopicSuggestion[]) {}
}

export class GetTopicSuggestionsFailAction implements Action {
  public readonly type = PodcastActionType.GET_TOPIC_SUGGESTIONS_FAIL;

  constructor(public error: Error) {}
}

export class AddTopicSuggestionAction implements Action {
  public readonly type = PodcastActionType.ADD_TOPIC_SUGGESTION;

  constructor(public topic: string) {}
}

export class AddTopicSuggestionSuccessAction implements Action {
  public readonly type = PodcastActionType.ADD_TOPIC_SUGGESTION_SUCCESS;

  constructor(public topicSuggestion: TopicSuggestion) {}
}

export class AddTopicSuggestionFailAction implements Action {
  public readonly type = PodcastActionType.ADD_TOPIC_SUGGESTION_FAIL;

  constructor(public error: Error) {}
}

export class TopicVoteAction implements Action {
  public readonly type = PodcastActionType.TOPIC_VOTE;

  constructor(public topicSuggestion: TopicSuggestion) {}
}

export class TopicVoteSuccessAction implements Action {
  public readonly type = PodcastActionType.TOPIC_VOTE_SUCCESS;

  constructor(public topicSuggestion: TopicSuggestion) {}
}

export class TopicVoteFailAction implements Action {
  public readonly type = PodcastActionType.TOPIC_VOTE_FAIL;

  constructor(public error: Error) {}
}

export class ShowAllTopicSuggestionsAction implements Action {
  public readonly type = PodcastActionType.SHOW_ALL_TOPIC_SUGGESTIONS;
}

export type PodcastAction =
  GetAction
  | GetSuccessAction
  | GetFailAction
  | UpdateShowNotesAction
  | UpdateShowNotesSuccessAction
  | UpdateShowNotesFailAction
  | GetTopicSuggestionsAction
  | GetTopicSuggestionsSuccessAction
  | GetTopicSuggestionsFailAction
  | AddTopicSuggestionAction
  | AddTopicSuggestionSuccessAction
  | AddTopicSuggestionFailAction
  | TopicVoteAction
  | TopicVoteSuccessAction
  | TopicVoteFailAction
  | ShowAllTopicSuggestionsAction;
