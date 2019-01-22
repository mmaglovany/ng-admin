import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getInitModuleState, State} from '../../modules/auth/store/auth.reducer';
import {take} from 'rxjs/operators';

@Injectable()
export class InitModulesGuard implements CanActivate {

  constructor(private store$: Store<State>) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.store$.pipe(
      select(getInitModuleState),
      take(1)
    );

  }

}
