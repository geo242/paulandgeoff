import { Action } from '@ngrx/store';
import { Session } from '../../../interfaces/session';
import { User } from '../../../interfaces/user';

export enum AuthenticationActionType {
  LOGIN               = '[Auth] Login',
  LOGIN_SUCCESS       = '[Auth] Login Success',
  LOGIN_FAIL          = '[Auth] Login Fail',
  LOGOUT              = '[Auth] Logout',
  LOGOUT_SUCCESS      = '[Auth] Logout Success',
  LOGOUT_FAIL         = '[Auth] Logout Fail',
  GET_USER            = '[Auth] Get User',
  GET_USER_SUCCESS    = '[Auth] Get User Success',
  GET_USER_FAIL       = '[Auth] Get User Fail',
  GET_SESSION         = '[Auth] Get Session',
  GET_SESSION_SUCCESS = '[Auth] Get Session Success',
  GET_SESSION_FAIL    = '[Auth] Get Session Fail'
}

export class LoginAction implements Action {
  public readonly type = AuthenticationActionType.LOGIN;
}

export class LoginSuccessAction implements Action {
  public readonly type = AuthenticationActionType.LOGIN_SUCCESS
}

export class LoginFailAction implements Action {
  public readonly type = AuthenticationActionType.LOGIN_FAIL
}

export class LogoutAction implements Action {
  public readonly type = AuthenticationActionType.LOGOUT;
}

export class LogoutSuccessAction implements Action {
  public readonly type = AuthenticationActionType.LOGOUT_SUCCESS;
}

export class LogoutFailAction implements Action {
  public readonly type = AuthenticationActionType.LOGOUT_FAIL;
}

export class GetUserAction implements Action {
  public readonly type = AuthenticationActionType.GET_USER;
}

export class GetUserSuccessAction implements Action {
  public readonly type = AuthenticationActionType.GET_USER_SUCCESS;

  constructor(public user: User) {}
}

export class GetUserFailAction implements Action {
  public readonly type = AuthenticationActionType.GET_USER_FAIL;
}

export class GetSessionAction implements Action {
  public readonly type = AuthenticationActionType.GET_SESSION;
}

export class GetSessionSuccessAction implements Action {
  public readonly type = AuthenticationActionType.GET_SESSION_SUCCESS;

  constructor(public session: Session) {}
}

export class GetSessionFailAction implements Action {
  public readonly type = AuthenticationActionType.GET_SESSION_FAIL;

  constructor(public error: Error) {}
}

export type AuthenticationAction =
  LoginAction
  | LogoutAction
  | LogoutSuccessAction
  | LogoutFailAction
  | LoginSuccessAction
  | LoginFailAction
  | GetUserAction
  | GetUserSuccessAction
  | GetUserFailAction
  | GetSessionAction
  | GetSessionSuccessAction
  | GetSessionFailAction;
