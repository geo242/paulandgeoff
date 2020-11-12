import { ActionReducerMap } from '@ngrx/store';
import { HasAuthenticationState } from '../authentication/store/reducer';
import { HasPodcastState } from '../podcast/store/reducer';

export interface State extends HasPodcastState, HasAuthenticationState {}

export const reducers: ActionReducerMap<State> = {
  podcast: undefined,
  authentication: undefined
};
