import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Injectable} from '@angular/core';
import {PostTicketMessage} from '../intarfaces/post-ticket-message';

@Injectable({providedIn: 'root'})
export class SupportService {
  constructor(private http: HttpClient) {
  }

  listTicket() {
    return this.http.get([environment.api, 'support', 'tickets'].join('/'));
  }

  getTicket(payload: { pid: string }) {
    return this.http.get([environment.api, 'support', 'tickets', payload.pid].join('/'));
  }

  postMessage(payload: PostTicketMessage) {
    return this.http.post([environment.api, 'support', 'tickets', payload.ticket.pid, 'messages'].join('/'), {
      message: payload.message,
      status: payload.status
    });
  }

  loadAttachment(payload: { url: string }) {
    return this.http.get(payload.url, {responseType: 'blob'});
  }

}
