import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Store} from '@ngrx/store';
import {State} from '../store/auth.reducer';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private store$: Store<State>,
              private http: HttpClient) {

  }

  login(payload: { username: string, password: string }) {
    return this.http.post([environment.api, 'auth'].join('/'), {
      username: payload.username,
      password: payload.password
    });
  }

}
