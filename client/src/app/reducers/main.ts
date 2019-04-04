import { routerReducer } from '@ngrx/router-store';
import { RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { HasAuthenticationState } from '../authentication/reducers';
import { HasPodcastState } from '../podcast/reducers';

export interface State extends HasPodcastState, HasAuthenticationState {
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  podcast: undefined,
  authentication: undefined
};
