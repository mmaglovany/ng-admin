import {Action} from '@ngrx/store';

export const DO_LOAD_ACCOUNTS = '[accounts] Load list of account.';
export const ON_LOAD_ACCOUNTS = '[accounts] Loaded list of accounts.';
export const DO_LOAD_ACCOUNT = '[accounts] Load account.';
export const ON_LOAD_ACCOUNT = '[accounts] Loaded account.';

export class DoLoadAccounts implements Action {
  readonly type = DO_LOAD_ACCOUNTS;

  constructor(public payload?: { page: number }) {
  }
}

export class OnLoadAccounts implements Action {
  readonly type = ON_LOAD_ACCOUNTS;

  constructor(public payload: any) {
  }
}

export class DoLoadAccount implements Action {
  readonly type = DO_LOAD_ACCOUNT;

  constructor(public payload: { pid: string }) {
  }
}

export class OnLoadAccount implements Action {
  readonly type = ON_LOAD_ACCOUNT;

  constructor(public payload: any) {
  }
}
