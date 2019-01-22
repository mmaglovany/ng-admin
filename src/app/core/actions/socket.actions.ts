import {Action} from '@ngrx/store';

export enum SocketActionTypes {
  SOCKET_ON = '[socket] on',
  SOCKET_OFF = '[socket] off'
}

class SocketOn implements Action {
  readonly type = SocketActionTypes.SOCKET_ON;
}

class SocketOff implements Action {
  readonly type = SocketActionTypes.SOCKET_OFF;
}

export const SocketActions = {SocketOn, SocketOff};

export type SocketActionsTypes = SocketOn | SocketOff;
