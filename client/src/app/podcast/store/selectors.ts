import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Session } from '../../../interfaces/session';
import { TopicSuggestion } from '../../../interfaces/topic-suggestion';
import { selectSession } from '../../authentication/store/selectors';
import { PodcastState } from './reducer';

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
      return { ...ts, isMyVote: ts.id === session.topicVoteId };
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

