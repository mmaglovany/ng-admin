import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {select, Store} from '@ngrx/store';
import {State} from '../reducers/app.reducer';
import {getAuthToken} from '../../modules/auth/store/auth.reducer';
import {SocketActions} from '../actions/socket.actions';
import {DoLogout} from '../../modules/auth/store/auth.actions';
import {Logger} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public _socket: SocketIOClient.Socket;

  constructor(private store$: Store<State>, private logger: Logger) {
    this.store$.pipe(select(getAuthToken))
      .subscribe((token) => {
        this._socket = io(environment.socket, {
          reconnection: true,
          forceNew: true,
          transports: ['polling', 'websocket'],
          transportOptions: {
            polling: {
              extraHeaders: {
                'Authorization': token
              }
            }
          }
        });

        this._socket.on('connect', () => {
          this.store$.dispatch(new SocketActions.SocketOn());
        });

        this._socket.on('disconnect', () => {
          this.store$.dispatch(new SocketActions.SocketOff());
          // this._socket.open();
        });

        this._socket.on('errors', (data) => {
          if (data === 'AUTH_FAILED') {
            this.store$.dispatch(new DoLogout());
          }
          logger.error(data);
        });

      });
  }

  get socket() {
    return this._socket;
  }

}
