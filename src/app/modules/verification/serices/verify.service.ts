import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class VerifyService {

  constructor(private http: HttpClient) {
  }

  get({pid}) {
    return this.http.get([environment.api, 'verifications', pid].join('/'));
  }

  send(payload: { pid: string, message: string, status: string }) {
    return this.http.post([environment.api, 'verifications', payload.pid].join('/'), {
      message: payload.message,
      status: payload.status
    });
  }

  loadDocument(payload: { pid: string }) {
    const url = [environment.api, 'verifications', payload.pid, 'document'].join('/');
    return this.http.get(url, {responseType: 'blob'});
  }

}
