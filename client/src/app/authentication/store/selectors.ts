import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../../interfaces/user';
import { AuthenticationState } from './reducer';

const selectAuthenticationState = createFeatureSelector<AuthenticationState>('authentication');
export const selectIsLoggedIn = createSelector(selectAuthenticationState,
  (state: AuthenticationState) => !!state.currentUser);
export const selectCurrentUser = createSelector(selectAuthenticationState,
  (state: AuthenticationState) => state.currentUser);
export const selectCurrentUserIsAdmin = createSelector(selectCurrentUser, (user: User) => !!user && user.isAdmin);
export const selectSession = createSelector(selectAuthenticationState, (state: AuthenticationState) => state.session);
