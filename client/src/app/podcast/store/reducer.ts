import { Episode } from '../../../interfaces/episode';
import { TopicSuggestion } from '../../../interfaces/topic-suggestion';
import { PodcastAction, PodcastActionType } from './actions';

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
      return { ...state, isBusy: true };
    case PodcastActionType.GET_SUCCESS:
      return { ...state, isBusy: false, episodes: action.episodes };
    case PodcastActionType.GET_FAIL:
      return { ...state, isBusy: false };
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
      return { ...state, isTopicSuggestionsBusy: true };
    case PodcastActionType.GET_TOPIC_SUGGESTIONS_SUCCESS: {
      return { ...state, isTopicSuggestionsBusy: false, topicSuggestions: action.topicSuggestions };
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
      return { ...state, isTopicSuggestionsBusy: false };
    case PodcastActionType.SHOW_ALL_TOPIC_SUGGESTIONS:
      return { ...state, topicLimit: undefined };
    case PodcastActionType.TOPIC_VOTE:
      return { ...state, isTopicSuggestionsBusy: true };
    case PodcastActionType.TOPIC_VOTE_SUCCESS:
    case PodcastActionType.TOPIC_VOTE_FAIL:
      return { ...state, isTopicSuggestionsBusy: false };
    default:
      return { ...state };
  }
}
