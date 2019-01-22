import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route} from '@angular/router';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getLoggedState, State} from '../store/auth.reducer';
import {map, switchMap, take} from 'rxjs/operators';

@Injectable()
export class ForAuthGuard implements CanLoad {

  constructor(private store$: Store<State>,
              private router: Router) {
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.store$.pipe(
      select(getLoggedState),
      take(1),
      switchMap((value) => {
        if (!value) {
          this.router.navigate(['/auth/login']);
        }
        return of(value);
      })
    );
  }
}
