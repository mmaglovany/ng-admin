import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {State} from '../reducers/app.reducer';
import {StartAjaxAction, StopAjaxAction} from '../actions/app.actions';
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {DoLogout, OnLoginError} from '../../modules/auth/store/auth.actions';
import {getAuthToken} from '../../modules/auth/store/auth.reducer';

@Injectable()
export class AjaxInterceptor implements HttpInterceptor {

  private token: string;

  constructor(private store$: Store<State>,
              private router: Router) {
    this.store$.pipe(
      select(getAuthToken),
    ).subscribe((token) => this.token = token);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
    const nextReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${this.token}`),
      withCredentials: true
    });

    this.store$.dispatch(new StartAjaxAction());
    return next.handle(nextReq).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 0:
            this.store$.dispatch(new DoLogout());
            this.router.navigate(['/auth', 'login']);
            if (/admin\/api\/v1\/auth/.test(nextReq.url)) {
              this.store$.dispatch(new OnLoginError({statusText: `Invalid IP on ${nextReq.url}`}));
            } else {
              this.store$.dispatch(new OnLoginError(err));
            }
            break;
          case 403:
            this.store$.dispatch(new DoLogout());
            this.router.navigate(['/auth', 'login']);
        }
        return throwError(err);
      }),
      finalize(() => {
        this.store$.dispatch(new StopAjaxAction());
      })
    );
  }

}
