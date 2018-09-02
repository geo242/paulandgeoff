import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../../interfaces/user';
import {
  AuthenticationActionType, GetSessionFailAction, GetSessionSuccessAction,
  GetUserFailAction,
  GetUserSuccessAction,
  LogoutFailAction,
  LogoutSuccessAction
} from '../actions';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationEffects {
  constructor(private actions$: Actions,
              private auth: AuthenticationService) {

  }

  @Effect({dispatch: false})
  public login$ = this.actions$.pipe(
    ofType(AuthenticationActionType.LOGIN),
    tap(() => {
      if (environment.production) {
        window.location.href = `${window.location.origin}/auth/google`;
      } else {
        window.location.href = 'http://localhost:9000/auth/google';
      }
    }));

  @Effect()
  public logout$ = this.actions$.pipe(
    ofType(AuthenticationActionType.LOGOUT),
    switchMap(() =>
      this.auth.logout()
          .pipe(
            map(() => new LogoutSuccessAction()),
            catchError(() => of(new LogoutFailAction()))
          ))
  );

  @Effect()
  public getUser$ = this.actions$.pipe(
    ofType(AuthenticationActionType.GET_USER),
    switchMap(() =>
      this.auth.me()
          .pipe(
            map((user: User) => new GetUserSuccessAction(user)),
            catchError(() => of(new GetUserFailAction()))
          ))
  );

  @Effect()
  public getSession$ = this.actions$.pipe(
    ofType(AuthenticationActionType.GET_SESSION),
    switchMap(() => this.auth.getSession()
      .pipe(
        map((session: any) => new GetSessionSuccessAction(session)),
        catchError((error: Error) => of(new GetSessionFailAction(error)))
      ))
  );
}
