import {SocketActionsTypes, SocketActionTypes} from '../actions/socket.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from '../../modules/chat/store/chat.reducer';

export interface SocketState {
  connection: boolean;
}

const initialState: SocketState = {
  connection: false
};

export function SocketReducer(state = initialState, action: SocketActionsTypes): SocketState {
  switch (action.type) {
    case SocketActionTypes.SOCKET_ON:
      return {...state, connection: true};
    case SocketActionTypes.SOCKET_OFF:
      return {...state, connection: false};
    default:
      return {...state};
  }
}

const getSocketState = createFeatureSelector<SocketState>('socket');

const _getState = (state: SocketState) => state.connection;

const getState = createSelector(getSocketState, _getState);

export const SocketSelectors = {
  getState
};
