import {Injectable} from '@angular/core';
import {SocketService} from '../../../core/services/socket.service';
import {ChatMessageType} from '../interfaces/chat-message-type';
import {ProtoService} from '../../shared/proto/proto.service';
import {Store} from '@ngrx/store';
import {State} from './chat.reducer';
import {AddChat, PushMessage} from './chat.actions';
import {ConversationHistoryRequestType} from '../interfaces/conversation-history-request-type';
import {ChatActions} from './chat.actions';
import {P} from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socketService: SocketService,
              private store$: Store<State>,
              private protoService: ProtoService) {

    this.socketService.socket.on('connect', () => {
      this.listChat();
    });

    this.socketService.socket.on('chat/indicator', (payload) => {
      const message = this.protoService.decode('Chat.IndicatorMessage', payload);
      this.store$.dispatch(new ChatActions.SetIndicators(message));
    });

    this.socketService.socket.on('chat/message', (payload) => {
      const message = this.protoService.decode('Chat.ConversationMessage', payload);
      this.store$.dispatch(new PushMessage(message));
    });
  }

  public markMessageAsRead(payload) {
    return new Promise((resolve, reject) => {
      const message = this.protoService.encode('Chat.MarkMessages', {
        markers: [{
          conversationPid: payload.conversationPid,
          messagesPids: [payload.messagePid]
        }]
      });
      this.socketService.socket.emit('chat/mark', message, (err, response) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(response);
        }
      });
    });
  }

  public listChat(payload?: { conversationPid: string }) {
    return new Promise((resolve, reject) => {
      const conditions: any = {};
      if (payload && payload.conversationPid) {
        conditions.conversationPid = [payload.conversationPid];
      }
      const listChatMessage = this.protoService.encode('Chat.ConversationListRequest', conditions);
      this.socketService.socket.emit('chat/list', listChatMessage, (err, response) => {
        if (err) {
          console.error(err);
        } else {
          const chats = this.protoService.decode('Chat.ConversationListResponse', response).conversations;
          if (chats) {
            chats.forEach(chat => this.store$.dispatch(new AddChat(chat)));
          }
        }
      });
    });
  }

  public loadChat(payload: ConversationHistoryRequestType) {
    return new Promise((resolve, reject) => {
      this.socketService.socket.emit('chat/messages/list',
        this.protoService.encode('Chat.ConversationHistoryRequest', payload),
        (err, response) => {
          if (!err) {
            resolve(this.protoService.decode('Chat.ConversationHistoryCallback', response));
          } else {
            console.error('chat.service loadChat', err);
            reject(err);
          }
        });
    });
  }

  public sendMessage(payload: { message: ChatMessageType }) {
    return new Promise((resolve) => {
      this.socketService.socket.emit('chat/message/send',
        this.protoService.encode('Chat.SendMessageRequest', payload.message),
        (err, response) => {
          if (!err) {
            const dataCallback = this.protoService.decode('Chat.SendMessageCallback', response);
            resolve(dataCallback);
          }
        });
    });
  }
}
