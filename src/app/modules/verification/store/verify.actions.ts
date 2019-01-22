import {Action} from '@ngrx/store';

export enum VerifyActionTypes {
  DO_LOAD_VERIFY_DETAILS = '[verify] Load verify details',
  ON_LOAD_VERIFY_DETAILS = '[verify] Loaded verify details',
  DO_SEND_VERIFY_STATUS = '[verify] Send verify status',
  ON_SEND_VERIFY_STATUS = '[verify] Sent verify status',
  DO_LOAD_DOCUMENT = '[verify] Load document',
  ON_LOAD_DOCUMENT = '[verify] Loaded document'

}

export class OnLoadDocument implements Action {
  readonly type = VerifyActionTypes.ON_LOAD_DOCUMENT;

  constructor(public payload: any) {
  }
}

export class DoLoadDocument implements Action {
  readonly type = VerifyActionTypes.DO_LOAD_DOCUMENT;

  constructor(public payload: { pid: string }) {
  }
}

export class DoLoadVerifyDetails implements Action {
  readonly type = VerifyActionTypes.DO_LOAD_VERIFY_DETAILS;

  constructor(public payload: { pid: string }) {
  }
}

export class OnLoadVerifyDetails implements Action {
  readonly type = VerifyActionTypes.ON_LOAD_VERIFY_DETAILS;

  constructor(public payload: any) {
  }
}

export class DoSendVerifyStatus implements Action {
  readonly type = VerifyActionTypes.DO_SEND_VERIFY_STATUS;

  constructor(public payload: any) {
  }
}

export class OnSendVerifyStatus implements Action {
  readonly type = VerifyActionTypes.ON_SEND_VERIFY_STATUS;

  constructor(public payload: any) {
  }
}

