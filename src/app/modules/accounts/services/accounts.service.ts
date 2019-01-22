import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AccountsService {

  constructor(private http: HttpClient) {
  }

  list(params) {
    return this.http.get([environment.api, 'accounts'].join('/'), {
      params
    });
  }

  get({pid}) {
    return this.http.get([environment.api, 'accounts', pid].join('/'));
  }

}
