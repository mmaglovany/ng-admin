import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import {catchError, exhaustMap, map, mergeMap, switchMap, take, tap} from 'rxjs/operators';
import {AuthActionTypes, OnInitAuthModule, OnLogin, OnLoginError} from './auth.actions';
import {AuthService} from '../seriveces/auth.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {State} from './auth.reducer';
import {Logger} from '../../../core/services/logger.service';

@Injectable({providedIn: 'root'})
export class AuthEffects {

  constructor(private actions$: Actions,
              private router: Router,
              private store$: Store<State>,
              private logger: Logger,
              private authService$: AuthService) {
    const authData = JSON.parse(window.localStorage.getItem('auth'));
    if (authData) {
      this.store$.dispatch(new OnInitAuthModule());
      this.store$.dispatch(new OnLogin(authData));
    } else {
      this.store$.dispatch(new OnInitAuthModule());
    }
  }

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.DO_LOGIN),
    exhaustMap((action: any) => {
      return this.authService$.login(action.payload).pipe(
        map(data => new OnLogin(data)),
        catchError(err => of(new OnLoginError(err)))
      );
    })
  );

  @Effect({dispatch: false})
  onLogin$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.ON_LOGIN),
    mergeMap((action: any) => {
      window.localStorage.setItem('auth', JSON.stringify(action.payload));
      return of(action);
    })
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.DO_LOGOUT),
    switchMap((action: any) => {
      console.log('ACTION', action);
      window.localStorage.clear();
      this.router.navigate(['auth', 'login']);
      return of(action);
    })
  );

}
