import {Component, OnInit} from '@angular/core';
import {ChatState, getChats, State} from '../../store/chat.reducer';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {getAuthPid} from '../../../auth/store/auth.reducer';

@Component({
  selector: 'lq-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  chats$: Observable<ChatState[]>;
  userPid$: Observable<String>;

  constructor(private store$: Store<State>,
              private router: Router) {
    this.chats$ = store$.pipe(select(getChats));
    this.userPid$ = store$.pipe(select(getAuthPid));
  }

  ngOnInit() {
  }

  goToChat(chat) {
    if (chat.pid) {
      this.router.navigate(['chat', chat.pid]);
    } else {
      this.router.navigate(['chat', 'user', chat.userPid]);
    }
  }

}
