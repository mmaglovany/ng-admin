import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {State} from '../../../../core/reducers/app.reducer';
import {Store} from '@ngrx/store';
import {AuthActionTypes, DoLogin, OnLoginError} from '../../store/auth.actions';
import {Actions, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';

@Component({
  selector: 'lq-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(private formBuilder: FormBuilder,
              private actions$: Actions,
              private store$: Store<State>) {
  }

  public authForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  loginFailed$ = this.actions$.pipe(
    ofType(AuthActionTypes.ON_LOGIN_ERROR),
    map((action: OnLoginError) => action.payload)
  );

  doLogin() {
    this.store$.dispatch(new DoLogin(this.authForm.value));
  }

}
