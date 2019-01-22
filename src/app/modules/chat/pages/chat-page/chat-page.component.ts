import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChatInterlocutorType} from '../../interfaces/chat-interlocutor-type';
import {select, Store} from '@ngrx/store';
import {getActiveChat, State} from '../../store/chat.reducer';
import {Observable} from 'rxjs';
import {getAuthPid} from '../../../auth/store/auth.reducer';
import {ChatActions} from '../../store/chat.actions';

@Component({
  selector: 'lq-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  public interlocutor: ChatInterlocutorType;

  userPid$: Observable<String>;
  chat$: Observable<any>;

  constructor(private route: ActivatedRoute,
              private store$: Store<State>) {
    this.userPid$ = store$.pipe(select(getAuthPid));
    this.chat$ = this.store$.select(getActiveChat);
  }

  ngOnInit() {
    this.route.url.subscribe(url => {
      const field = this.route.data['value'].field;
      const pid = this.route.snapshot.params['pid'];
      this.store$.dispatch(new ChatActions.DoLoadChat({[field]: pid}));
      this.interlocutor = {pid};
    });
  }

}
