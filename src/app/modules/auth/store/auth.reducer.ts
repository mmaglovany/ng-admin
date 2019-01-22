import {AuthActionTypes, AuthActions} from './auth.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
  _onInit: boolean;
  pid: string;
  username: string;
  token: string;
}

const initialState: State = {
  _onInit: false,
  pid: null,
  username: null,
  token: null
};

export function authReducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.ON_INIT_AUTH_MODULE:
      return Object.assign({}, state, {
        _onInit: true
      });
    case AuthActionTypes.ON_LOGIN_ERROR:
      return Object.assign({}, state, {
        pid: null,
        username: null,
        token: null,
      });
    case AuthActionTypes.ON_LOGIN:
      return Object.assign({}, state, {
        pid: action.payload.user.pid,
        username: action.payload.user.username,
        token: action.payload.token,
      });
    case AuthActionTypes.DO_LOGOUT:
      return Object.assign({}, state, {
        pid: null,
        username: null,
        token: null,
      });
    default:
      return state;
  }

}

export const _getLoggedState = (state: State) => {
  return state && state.pid && !!state.pid;
};

export const _getInitModuleState = (state: State) => state._onInit;
export const _getAuthToken = (state: State) => state.token;
export const _getAuthPid = (state: State) => state.pid;
export const getAuthState = createFeatureSelector<State>('auth');

export const getLoggedState = createSelector(getAuthState, _getLoggedState);
export const getInitModuleState = createSelector(getAuthState, _getInitModuleState);
export const getAuthToken = createSelector(getAuthState, _getAuthToken);
export const getAuthPid = createSelector(getAuthState, _getAuthPid);
