import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getLoggedState, State} from './modules/auth/store/auth.reducer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {DoLogout} from './modules/auth/store/auth.actions';
import {ChatSelectors} from './modules/chat/store/chat.reducer';

@Component({
  selector: 'lq-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  auth$: Observable<any>;
  chatCounter$: Observable<number>;

  constructor(private store$: Store<State>,
              private route: ActivatedRoute,
              private router: Router) {
    this.chatCounter$ = this.store$.select(ChatSelectors.getIndicator);

    this.auth$ = store$.pipe(
      select(getLoggedState),
      map((a) => {
        if (this.router.url === '/auth/login') {
          this.router.navigate(['/accounts']);
        }
        return a;
      })
    );
  }

  logOut() {
    this.store$.dispatch(new DoLogout());
  }

}
