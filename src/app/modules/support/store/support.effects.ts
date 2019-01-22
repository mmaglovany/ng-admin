import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {SupportService} from '../services/support.service';
import {
  DO_LIST_TICKETS,
  DO_LOAD_TICKET,
  DO_SEND_MESSAGE,
  DoSendMessage,
  OnLoadTicket,
  OnLoadTicketsList,
  OnSendMessage, OnSendMessageError
} from './support.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import sortBy from 'lodash-es/sortBy';
import {OnLoadAccounts} from '../../accounts/store/accounts.actions';

@Injectable()
export class SupportEffects {

  constructor(private actions$: Actions,
              private supportService$: SupportService) {
  }

  @Effect()
  loadListTickets$: Observable<Action> = this.actions$.pipe(
    ofType(DO_LIST_TICKETS),
    mergeMap((action: any) => this.supportService$.listTicket().pipe(
      map(data => new OnLoadTicketsList(data))
    ))
  );

  @Effect()
  loadTicket$: Observable<Action> = this.actions$.pipe(
    ofType(DO_LOAD_TICKET),
    mergeMap((action: any) => this.supportService$.getTicket(action.payload).pipe(
      map((data: any) => {
        if (data && data.messages) {
          data.messages = sortBy(data.messages, (obj) => new Date(obj.created_at));
        }
        return new OnLoadTicket(data);
      })
    ))
  );

  @Effect()
  sendMessage$: Observable<Action> = this.actions$.pipe(
    ofType(DO_SEND_MESSAGE),
    mergeMap((action: DoSendMessage) => this.supportService$.postMessage(action.payload).pipe(
      map(data => new OnSendMessage(data)),
      catchError(err => of(new OnSendMessageError(err)))
    ))
  );

}
