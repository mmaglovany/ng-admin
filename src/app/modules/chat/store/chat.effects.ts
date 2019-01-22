import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {
  AddMessageToChat, ChatActionTypes,
  DO_LIST_CHAT, DO_LOAD_CHAT,
  DO_SEND_MESSAGE, DoChatReferenceCorrection, DoListChat, MarkMessageAsRead,
  OnLoadChat,
  OnSendMessage,
  PUSH_MESSAGE
} from './chat.actions';
import {catchError, exhaustMap, map, mergeMap, take, tap} from 'rxjs/operators';
import {ChatService} from './chat.service';
import {getChats, State} from './chat.reducer';
import {Router} from '@angular/router';
import {Logger} from '../../../core/services/logger.service';

@Injectable()
export class ChatEffect {

  constructor(private actions$: Actions,
              private store$: Store<State>,
              private router: Router,
              private logger: Logger,
              private chatService: ChatService) {
  }

  @Effect({dispatch: false})
  markMessageAsRead$ = this.actions$.pipe(
    ofType(ChatActionTypes.MARK_MESSAGE_AS_READ),
    mergeMap((action: MarkMessageAsRead) => this.chatService
      .markMessageAsRead(action.payload)
      .then(() => {
      })
      .catch(() => {
      })
    )
  );

  @Effect()
  listChat$: Observable<Action> = this.actions$.pipe(
    ofType(DO_LIST_CHAT),
    mergeMap((action: any) => this.chatService.listChat(action.payload)
      .then((result) => {
        this.logger.log('EFFECT: DO_LOAD_CHAT result', result);
        return new OnLoadChat(result);
      })
    ),
    catchError(err => Observable.of(err))
  );

  @Effect()
  loadChat$: Observable<Action> = this.actions$.pipe(
    ofType(DO_LOAD_CHAT),
    exhaustMap((action: any) => this.chatService.loadChat(action.payload)
      .then((result) => {
        this.logger.log('EFFECT: DO_LOAD_CHAT result', result);
        return new OnLoadChat(result);
      })
    ),
    catchError(err => {
      this.logger.log('loadChat$ error', err);
      return Observable.of(err);
    })
  );

  @Effect()
  sendMessage$: Observable<Action> = this.actions$.pipe(
    ofType(DO_SEND_MESSAGE),
    mergeMap((action: any) => {
      this.logger.log('EFFECT: DO_SEND_MESSAGE action', action);
      return this.chatService.sendMessage(action.payload)
        .then((result: any) => {
            if (action.payload.message.userPid && result.conversationPid) {
              this.store$.dispatch(new DoChatReferenceCorrection({
                userPid: action.payload.message.userPid,
                conversationPid: result.conversationPid
              }));
              this.router.navigate(['chat', result.conversationPid]);
            }
            return new OnSendMessage(result);
          }
        );
    })
  );

  @Effect({dispatch: false})
  pushMessage$ = this.actions$.pipe(
    ofType(PUSH_MESSAGE),
    map((action: any) => {
      this.store$
        .select(getChats)
        .pipe(
          take(1),
          tap(chats => {
            const targetChat = chats.find((chat) => chat.pid === action.payload.conversationPid);
            this.logger.log('pushMessage$', action.payload, chats, targetChat);
            if (!targetChat) {
              this.store$.dispatch(new DoListChat({conversationPid: action.payload.conversationPid}));
            } else {
              this.store$.dispatch(new AddMessageToChat(action.payload));
            }
          })
        )
        .subscribe();
    }),
    catchError(err => Observable.of(err))
  );

}
