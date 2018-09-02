import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Session } from '../../../interfaces/session';
import { User } from '../../../interfaces/user';
import { PodcastAction, PodcastActionType } from '../../podcast/actions';
import { AuthenticationAction, AuthenticationActionType } from '../actions';

export interface AuthenticationState {
  isBusy: boolean;
  currentUser: User;
  session: Session;
}

export interface HasAuthenticationState {
  authentication: AuthenticationState
}

const initialAuthenticationState: AuthenticationState = {
  isBusy: false,
  currentUser: undefined,
  session: {}
};

export function authenticationReducer(state: AuthenticationState = initialAuthenticationState, action: AuthenticationAction | PodcastAction): AuthenticationState {
  switch (action.type) {
    case AuthenticationActionType.LOGIN:
      return {...state, isBusy: true};
    case AuthenticationActionType.LOGIN_FAIL:
    case AuthenticationActionType.LOGIN_SUCCESS:
      return {...state, isBusy: false};
    case AuthenticationActionType.GET_USER_SUCCESS:
      return {...state, currentUser: action.user};
    case AuthenticationActionType.GET_USER_FAIL:
    case AuthenticationActionType.LOGOUT_SUCCESS:
      return {...state, currentUser: undefined};
    case AuthenticationActionType.GET_SESSION_SUCCESS:
      return {...state, session: action.session};
    case PodcastActionType.TOPIC_VOTE_SUCCESS:
      return {...state, session: {...state.session, topicVoteId: action.topicSuggestion.id}};
    default:
      return {...state};
  }
}

const selectAuthenticationState = createFeatureSelector<AuthenticationState>('authentication');
export const selectIsLoggedIn = createSelector(selectAuthenticationState,
  (state: AuthenticationState) => !!state.currentUser);
export const selectCurrentUser = createSelector(selectAuthenticationState,
  (state: AuthenticationState) => state.currentUser);
export const selectCurrentUserIsAdmin = createSelector(selectCurrentUser, (user: User) => !!user && user.isAdmin);
export const selectSession = createSelector(selectAuthenticationState, (state: AuthenticationState) => state.session);
