import {Action} from '@ngrx/store';
import {ChatMessageType} from '../interfaces/chat-message-type';
import {ActiveChatState, ChatState} from './chat.reducer';
import {ConversationHistoryRequestType} from '../interfaces/conversation-history-request-type';
import {ConversationMessageType} from '../interfaces/conversation-message-type';
import {IndicatorMessageType} from '../interfaces/indicator-message-type';

export enum ChatActionTypes {
  SET_INDICATOR = '[chat] Set indicators',
  MARK_MESSAGE_AS_READ = '[chat] Mark message as read'
}

export const DO_SEND_MESSAGE = '[chat] Send message';
export const ON_SEND_MESSAGE = '[chat] Sent message';
export const DO_LOAD_CHAT = '[chat] Load chat';
export const ON_LOAD_CHAT = '[chat] Loaded chat';
export const ADD_CHAT = '[chat] Add chat';
export const SET_ACTIVE_CHAT = '[chat] Set active chat';
export const PUSH_MESSAGE = '[chat] push message';
export const ADD_MESSAGE_TO_CHAT = '[chat] Add message to chat';
export const REFERENCE_CORRECTION = '[chat] reference correction';
export const DO_LIST_CHAT = '[chat] List chat';

export class DoListChat implements Action {
  readonly type = DO_LIST_CHAT;

  constructor(public payload?: { conversationPid?: string }) {
  }
}

export class DoChatReferenceCorrection implements Action {
  readonly type = REFERENCE_CORRECTION;

  constructor(public payload: { userPid: string, conversationPid: string }) {
  }
}

class DoSendMessage implements Action {
  readonly type = DO_SEND_MESSAGE;

  constructor(public payload: { message: ChatMessageType }) {
  }
}

export class OnSendMessage implements Action {
  readonly type = ON_SEND_MESSAGE;

  constructor(public payload: { message: ChatMessageType, conversationPid?: string }) {
  }
}

class DoLoadChat implements Action {
  readonly type = DO_LOAD_CHAT;

  constructor(public payload: ConversationHistoryRequestType) {
  }
}

export class OnLoadChat implements Action {
  readonly type = ON_LOAD_CHAT;

  constructor(public payload: any) {
  }
}

export class AddChat implements Action {
  readonly type = ADD_CHAT;

  constructor(public payload: ChatState) {
  }
}

export class SetActiveChat implements Action {
  readonly type = SET_ACTIVE_CHAT;

  constructor(public payload: ActiveChatState) {
  }
}

export class PushMessage implements Action {
  readonly type = PUSH_MESSAGE;

  constructor(public payload: ConversationMessageType) {
  }
}

export class AddMessageToChat implements Action {
  readonly type = ADD_MESSAGE_TO_CHAT;

  constructor(public payload: ConversationMessageType) {
  }
}

class SetIndicators implements Action {
  readonly type = ChatActionTypes.SET_INDICATOR;

  constructor(public payload: IndicatorMessageType) {
  }
}

export class MarkMessageAsRead implements Action {
  readonly type = ChatActionTypes.MARK_MESSAGE_AS_READ;

  constructor(public payload: { conversationPid: string, messagePid: string }) {
  }
}

export const ChatActions = {
  DoSendMessage,
  DoLoadChat,
  SetIndicators,
  MarkMessageAsRead
};

export type ChatActionsTypes =
  DoSendMessage
  | MarkMessageAsRead
  | OnSendMessage
  | AddChat
  | OnLoadChat
  | SetActiveChat
  | PushMessage
  | AddMessageToChat
  | DoChatReferenceCorrection
  | SetIndicators;
