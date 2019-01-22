import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {VerifyService} from '../serices/verify.service';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {
  VerifyActionTypes,
  OnLoadDocument,
  OnLoadVerifyDetails,
  OnSendVerifyStatus
} from './verify.actions';
import {of} from 'rxjs';
import {ErrorAjaxAction} from '../../../core/actions/app.actions';

@Injectable()
export class VerifyEffects {

  constructor(private actions$: Actions,
              private verifyService$: VerifyService) {
  }

  @Effect()
  loadVerify$: Observable<Action> = this.actions$.pipe(
    ofType(VerifyActionTypes.DO_LOAD_VERIFY_DETAILS),
    mergeMap((action: any) => this.verifyService$.get(action.payload).pipe(
      map(data => new OnLoadVerifyDetails(data))
    ))
  );

  @Effect()
  sendVerifyStatus$: Observable<Action> = this.actions$.pipe(
    ofType(VerifyActionTypes.DO_SEND_VERIFY_STATUS),
    mergeMap((action: any) => this.verifyService$.send(action.payload).pipe(
      map(data => new OnSendVerifyStatus(data)),
      catchError(err => of(new ErrorAjaxAction()))
    ))
  );

  @Effect()
  loadDocument$: Observable<Action> = this.actions$.pipe(
    ofType(VerifyActionTypes.DO_LOAD_DOCUMENT),
    mergeMap((action: any) => this.verifyService$.loadDocument(action.payload).pipe(
      map(data => new OnLoadDocument(data)),
      catchError(err => of(new ErrorAjaxAction()))
    ))
  );
}
