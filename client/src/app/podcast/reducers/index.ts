import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Episode } from '../../../interfaces/episode';
import { PodcastAction, PodcastActionType } from '../actions';

export interface PodcastState {
  episodes: Episode[];
  isBusy: boolean;
}

export interface HasPodcastState {
  podcast: PodcastState;
}

const initialPodcastState: PodcastState = {
  episodes: [],
  isBusy: false
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
          if (episode.id === action.episode.id) {
            return action.episode;
          }
          return episode;
        })
      };
    default:
      return {...state};
  }
}

const selectPodcastState = createFeatureSelector<PodcastState>('podcast');
export const selectEpisodes = createSelector(selectPodcastState, (state: PodcastState) => state.episodes);
export const selectIsBusy = createSelector(selectPodcastState, (state: PodcastState) => state.isBusy);
