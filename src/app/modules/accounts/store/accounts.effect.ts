import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AccountsService} from '../services/accounts.service';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {DO_LOAD_ACCOUNT, DO_LOAD_ACCOUNTS, OnLoadAccount, OnLoadAccounts} from './accounts.actions';
import {mergeMap, map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class AccountsEffect {

  @Effect()
  loadAccounts$: Observable<Action> = this.actions$.pipe(
    ofType(DO_LOAD_ACCOUNTS),
    mergeMap((action: any) => this.accountsService$.list(action.payload).pipe(
      map(data => new OnLoadAccounts(data)),
      catchError(err => of(new OnLoadAccounts({})))
    ))
  );

  @Effect()
  loadAccount$: Observable<Action> = this.actions$.pipe(
    ofType(DO_LOAD_ACCOUNT),
    mergeMap((action: any) => this.accountsService$.get(action.payload).pipe(
      map(data => new OnLoadAccount(data))
    ))
  );

  constructor(private actions$: Actions,
              private accountsService$: AccountsService) {
  }

}
