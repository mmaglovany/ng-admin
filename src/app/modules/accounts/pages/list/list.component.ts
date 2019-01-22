import {Component, OnInit} from '@angular/core';
import {AccountsService} from '../../services/accounts.service';
import {Actions, ofType} from '@ngrx/effects';
import {DoLoadAccounts, ON_LOAD_ACCOUNTS, OnLoadAccounts} from '../../store/accounts.actions';
import {Store} from '@ngrx/store';
import {State} from '../../../../core/reducers/app.reducer';
import {map} from 'rxjs/operators';
import {ChatActions} from '../../../chat/store/chat.actions';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'lq-list-page',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private accountsService: AccountsService,
              private route: ActivatedRoute,
              private store$: Store<State>,
              private actions$: Actions) {
  }

  $accounts = this.actions$.pipe(
    ofType(ON_LOAD_ACCOUNTS),
    map((action: OnLoadAccounts) => action.payload)
  );

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.store$.dispatch(new DoLoadAccounts({
        page: params.page || 1
      }));
    });
  }

}
