import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  DoLoadTicket,
  DoSendMessage,
  ON_LOAD_TICKET,
  ON_SEND_MESSAGE,
  ON_SEND_MESSAGE_ERROR,
  OnLoadTicket
} from '../../store/support.actions';
import {Store} from '@ngrx/store';
import {State} from '../../../../core/reducers/app.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {catchError, finalize, map, take, tap} from 'rxjs/operators';
import {PostTicketMessage} from '../../intarfaces/post-ticket-message';

@Component({
  selector: 'lq-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.scss']
})
export class TicketPageComponent implements OnInit, OnDestroy {

  @ViewChild('form') form;

  constructor(private route: ActivatedRoute,
              private actions$: Actions,
              private store$: Store<State>) {
  }

  private pid: string;

  public ticket$ = this.actions$.pipe(
    ofType(ON_LOAD_TICKET),
    map((action: OnLoadTicket) => action.payload)
  );

  public sendError$ = this.actions$.pipe(
    ofType(ON_SEND_MESSAGE_ERROR),
    catchError(err => err)
  );

  public onSendSuccess$;

  ngOnInit() {
    this.onSendSuccess$ = this.actions$.pipe(
      ofType(ON_SEND_MESSAGE),
    ).subscribe(() => {
      this.store$.dispatch(new DoLoadTicket({pid: this.pid}));
      this.form.clearForm();
    });

    this.pid = this.route.snapshot.params['pid'];
    this.store$.dispatch(new DoLoadTicket({pid: this.pid}));
  }

  onSubmitMessage(event: PostTicketMessage) {
    const payload = Object.assign({}, event, {
      ticket: {
        pid: this.pid
      }
    });
    this.store$.dispatch(new DoSendMessage(payload));
  }

  ngOnDestroy(): void {
    this.onSendSuccess$.unsubscribe();
  }

}
