import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DoLoadVerifyDetails, DoSendVerifyStatus, VerifyActionTypes} from '../../store/verify.actions';
import {Store} from '@ngrx/store';
import {State} from '../../../../core/reducers/app.reducer';
import {OnLoadAccounts} from '../../../accounts/store/accounts.actions';
import {Actions, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {environment} from '../../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'lq-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private actions$: Actions,
              private formBuilder: FormBuilder,
              private store$: Store<State>) {
  }

  public verify$ = this.actions$.pipe(
    ofType(VerifyActionTypes.ON_LOAD_VERIFY_DETAILS),
    map((action: OnLoadAccounts) => action.payload)
  );

  public onVerify$ = this.actions$.pipe(
    ofType(VerifyActionTypes.ON_SEND_VERIFY_STATUS),
    map(() => this.ngOnInit())
  ).subscribe();

  public pid: string;

  public verifyForm: FormGroup = this.formBuilder.group({
    message: '',
    status: ['', Validators.required]
  });

  ngOnInit() {
    this.pid = this.route.snapshot.params['pid'];
    this.store$.dispatch(new DoLoadVerifyDetails({pid: this.pid}));
  }

  doSubmitVerifyForm() {
    if (this.verifyForm.invalid) {
      return this.verifyForm.markAsDirty();
    }
    this.store$.dispatch(new DoSendVerifyStatus({
      pid: this.pid,
      message: this.verifyForm.get('message').value,
      status: this.verifyForm.get('status').value
    }));
  }

}
