import {Component, OnInit} from '@angular/core';
import {DoLoadAccounts, ON_LOAD_ACCOUNTS, OnLoadAccounts} from '../../../accounts/store/accounts.actions';
import {State} from '../../../../core/reducers/app.reducer';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';

@Component({
  selector: 'lq-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private store$: Store<State>,
              private actions$: Actions) {
  }

  $accounts = this.actions$.pipe(
    ofType(ON_LOAD_ACCOUNTS),
    map((action: OnLoadAccounts) => action.payload.accounts)
  );

  ngOnInit() {
    this.store$.dispatch(new DoLoadAccounts());
  }

}
