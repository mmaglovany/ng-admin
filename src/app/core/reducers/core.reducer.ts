import * as fromApp from './app.reducer';
import {ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {SocketReducer, SocketState} from './socket.reducer';

export interface State {
  app: fromApp.State;
  socket: SocketState;
}

export const reducers: ActionReducerMap<State> = {
  app: fromApp.reducer,
  socket: SocketReducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  const css = 'color:gray';

  return function (state: State, action: any): State {
    console.log('%c[ state  ]', css, state);
    console.log('%c[ action ]', css, action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

export const getAppState = createFeatureSelector<fromApp.State>('app');

export const getAjaxState = createSelector(getAppState, fromApp.getAjaxState);
