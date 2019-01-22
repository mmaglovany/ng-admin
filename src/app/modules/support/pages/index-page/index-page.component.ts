import {Component, OnInit} from '@angular/core';
import {DoLoadTicketsList, ON_LIST_TICKETS, OnLoadTicketsList} from '../../store/support.actions';
import {Store} from '@ngrx/store';
import {State} from '../../../../core/reducers/app.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';

@Component({
  selector: 'lq-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {

  constructor(private store$: Store<State>,
              private actions$: Actions) {
  }

  $tickets = this.actions$.pipe(
    ofType(ON_LIST_TICKETS),
    map((action: OnLoadTicketsList) => action.payload.tickets)
  );

  ngOnInit() {
    this.store$.dispatch(new DoLoadTicketsList());
  }

}
