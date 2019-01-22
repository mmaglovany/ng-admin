import {Action} from '@ngrx/store';

export enum AuthActionTypes {
  DO_LOGIN = '[auth] Do login',
  ON_INIT_AUTH_MODULE = '[auth] Init module',
  ON_LOGIN = '[auth] On login',
  ON_LOGIN_ERROR = '[auth] On error login',
  DO_LOGOUT = '[accounts] Logout account.'
}

export class OnInitAuthModule implements Action {
  readonly type = AuthActionTypes.ON_INIT_AUTH_MODULE;
}

export class DoLogin implements Action {
  readonly type = AuthActionTypes.DO_LOGIN;

  constructor(public payload: { username: string, password: string }) {
  }
}

export class OnLogin implements Action {
  readonly type = AuthActionTypes.ON_LOGIN;

  constructor(public payload: any) {
  }
}

export class OnLoginError implements Action {
  readonly type = AuthActionTypes.ON_LOGIN_ERROR;

  constructor(public payload: any) {
  }
}

export class DoLogout implements Action {
  readonly type = AuthActionTypes.DO_LOGOUT;
}


export type AuthActions = DoLogin | OnLogin | OnLoginError | DoLogout | OnInitAuthModule;
