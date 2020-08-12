import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Episode } from '../../../interfaces/episode';
import { Session } from '../../../interfaces/session';
import { TopicSuggestion } from '../../../interfaces/topic-suggestion';
import { selectSession } from '../../authentication/reducers';
import { PodcastAction, PodcastActionType } from '../actions';

export interface PodcastState {
  episodes: Episode[];
  isBusy: boolean;
  isTopicSuggestionsBusy: boolean;
  topicSuggestions: TopicSuggestion[];
  topicLimit: number;
}

export interface HasPodcastState {
  podcast: PodcastState;
}

const initialPodcastState: PodcastState = {
  episodes: [],
  isBusy: false,
  isTopicSuggestionsBusy: false,
  topicSuggestions: [],
  topicLimit: 5
};

export function podcastReducer(state: PodcastState = initialPodcastState, action: PodcastAction): PodcastState {
  switch (action.type) {
    case PodcastActionType.GET:
      return {...state, isBusy: true};
    case PodcastActionType.GET_SUCCESS:
      return {...state, isBusy: false, episodes: action.episodes};
    case PodcastActionType.GET_FAIL:
      return {...state, isBusy: false};
    case PodcastActionType.UPDATE_SHOW_NOTES_SUCCESS:
      return {
        ...state, episodes: state.episodes.map((episode: Episode) => {
          if (episode.episodeId === action.episode.episodeId) {
            return action.episode;
          }
          return episode;
        })
      };
    case PodcastActionType.GET_TOPIC_SUGGESTIONS:
    case PodcastActionType.ADD_TOPIC_SUGGESTION:
      return {...state, isTopicSuggestionsBusy: true};
    case PodcastActionType.GET_TOPIC_SUGGESTIONS_SUCCESS: {
      return {...state, isTopicSuggestionsBusy: false, topicSuggestions: action.topicSuggestions};
    }
    case PodcastActionType.ADD_TOPIC_SUGGESTION_SUCCESS: {
      return {
        ...state,
        isTopicSuggestionsBusy: false,
        topicSuggestions: [...state.topicSuggestions, action.topicSuggestion]
      };
    }
    case PodcastActionType.GET_TOPIC_SUGGESTIONS_FAIL:
    case PodcastActionType.ADD_TOPIC_SUGGESTION_FAIL:
      return {...state, isTopicSuggestionsBusy: false};
    case PodcastActionType.SHOW_ALL_TOPIC_SUGGESTIONS:
      return {...state, topicLimit: undefined};
    case PodcastActionType.TOPIC_VOTE:
      return {...state, isTopicSuggestionsBusy: true};
    case PodcastActionType.TOPIC_VOTE_SUCCESS:
    case PodcastActionType.TOPIC_VOTE_FAIL:
      return {...state, isTopicSuggestionsBusy: false};
    default:
      return {...state};
  }
}

const selectPodcastState = createFeatureSelector<PodcastState>('podcast');
export const selectEpisodes = createSelector(selectPodcastState, (state: PodcastState) => state.episodes);
export const selectIsBusy = createSelector(selectPodcastState, (state: PodcastState) => state.isBusy);
export const selectIsTopicSuggestionsBusy = createSelector(selectPodcastState,
  (state: PodcastState) => state.isTopicSuggestionsBusy);
export const selectTopicDisplayLimit = createSelector(selectPodcastState, (state: PodcastState) => state.topicLimit);
export const selectAllTopicSuggestions = createSelector(selectPodcastState,
  (state: PodcastState) => state.topicSuggestions || []);
export const selectTopicSuggestions = createSelector(selectAllTopicSuggestions,
  selectSession,
  (topicSuggestions: TopicSuggestion[], session: Session) => {
    return topicSuggestions.map((ts: TopicSuggestion) => {
      return {...ts, isMyVote: ts.id === session.topicVoteId};
    }).sort((t1: TopicSuggestion, t2: TopicSuggestion) => t1.votes > t2.votes ? -1 : t1.votes < t2.votes ? 1 : 0);
  });

export const selectIncompleteTopicSuggestions = createSelector(selectTopicSuggestions, selectTopicDisplayLimit,
  (suggestions: TopicSuggestion[], topicLimit: number) => {
    let results = (suggestions || []).filter(t => !t.isComplete);
    if (!!topicLimit && results.length > topicLimit) {
      results = results.slice(0, topicLimit);
    }
    return results;
  });

export const selectCompleteTopicSuggestions = createSelector(selectTopicSuggestions, selectTopicDisplayLimit,
  (suggestions: TopicSuggestion[], topicLimit: number) => {
    let results = (suggestions || []).filter(t => t.isComplete);
    if (!!topicLimit && results.length > topicLimit) {
      results = results.slice(0, topicLimit);
    }
    return results;
  });

export const selectShowShowAllButton = createSelector(selectTopicDisplayLimit,
  selectAllTopicSuggestions,
  (topicLimit: number, topicSuggestions: TopicSuggestion[]) => !!topicLimit && topicSuggestions.length > topicLimit);

