import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {SocketSelectors, SocketState} from '../../../../core/reducers/socket.reducer';

@Component({
  selector: 'lq-connection-state',
  templateUrl: './connection-state.component.html',
  styleUrls: ['./connection-state.component.scss']
})
export class ConnectionStateComponent implements OnInit {

  state$: Observable<any>;

  constructor(private store$: Store<SocketState>) {
    this.state$ = store$.pipe(select(SocketSelectors.getState));
  }

  ngOnInit() {
  }

}
