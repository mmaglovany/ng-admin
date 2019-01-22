import {Component, OnInit} from '@angular/core';
import {Actions, ofType} from '@ngrx/effects';
import {AccountsService} from '../../services/accounts.service';
import {State} from '../../../../core/reducers/app.reducer';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {DoLoadAccount, ON_LOAD_ACCOUNT, OnLoadAccounts} from '../../store/accounts.actions';
import {map} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private accountsService: AccountsService,
              private store$: Store<State>,
              private actions$: Actions,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
  }

  public form: FormGroup = this.formBuilder.group({
    id: '',
    pid: '',
    username: '',
    avatar: ''
  });

  public account$ = this.actions$.pipe(
    ofType(ON_LOAD_ACCOUNT),
    map((action: OnLoadAccounts) => action.payload)
  )

  ngOnInit() {
    const pid = this.route.snapshot.params['pid'];
    this.store$.dispatch(new DoLoadAccount({pid}));
  }

}
