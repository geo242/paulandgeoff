import { ActionReducerMap } from '@ngrx/store';
import { HasAuthenticationState } from '../authentication/reducers';
import { HasPodcastState } from '../podcast/reducers';

export interface State extends HasPodcastState, HasAuthenticationState {}

export const reducers: ActionReducerMap<State> = {
  podcast: undefined,
  authentication: undefined
};
