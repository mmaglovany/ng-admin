import {
  ADD_CHAT,
  ADD_MESSAGE_TO_CHAT, ChatActionsTypes,
  ChatActionTypes,
  ON_LOAD_CHAT,
  REFERENCE_CORRECTION,
  SET_ACTIVE_CHAT
} from './chat.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IndicatorMessageType} from '../interfaces/indicator-message-type';

export interface ParticipantState {
  pid: string;
  username: string;
  avatarURL: string;
}

export interface MessageState {
  pid: string;
  message: string;
  createdAt: string;
}

export interface ChatState {
  lastMessage?: any;
  userPid?: string;
  pid?: string;
  participants: ParticipantState[];
  messages: MessageState[];
  unreadMessages?: number;
}

export interface ActiveChatState {
  pid: string;
  field: string;
}

export interface State {
  chats: ChatState[];
  activeChat: ActiveChatState;
  indicator: number;
}

const initialState: State = {
  indicator: null,
  chats: [],
  activeChat: null
};

export function reducer(state = initialState, action: ChatActionsTypes): State {
  const payload: any = action.payload;

  switch (action.type) {
    case ChatActionTypes.SET_INDICATOR:
      const data: IndicatorMessageType = payload;
      state.indicator = data.count;
      data.conversations = data.conversations || [];
      data.conversations.forEach(conversationIndicator => {
        const targetIndicatorChat = state.chats.find((chat) => chat.pid === conversationIndicator.conversationPid);
        if (targetIndicatorChat) {
          targetIndicatorChat.unreadMessages = data.count;
        }
      });
      return {...state};
    case REFERENCE_CORRECTION:
      const targetChatForCorrection: ChatState = state.chats.find(chat => chat.userPid === payload.userPid);
      if (targetChatForCorrection) {
        targetChatForCorrection.pid = payload.conversationPid;
      }
      return {...state};
    case ADD_MESSAGE_TO_CHAT:
      const targetChatForUpdate = state.chats.find(chat => chat.pid === payload.conversationPid);
      if (targetChatForUpdate && targetChatForUpdate.messages) {
        targetChatForUpdate.messages.push(payload);
      }
      targetChatForUpdate.lastMessage = payload;
      return {...state};
    case SET_ACTIVE_CHAT:
      return {...state, activeChat: payload};
    case ADD_CHAT:
      const targetNewChat = state.chats.find((chat) => chat.pid === action.payload.pid);
      if (!targetNewChat) {
        state.chats.push(action.payload);
      }
      return {...state};
    case ON_LOAD_CHAT:
      let targetChat: ChatState;
      let activeChat: ActiveChatState;
      if (payload.conversationPid) {
        targetChat = state.chats.find(chat => chat.pid === payload.conversationPid);
        if (!targetChat) {
          state.chats.push({...payload, pid: payload.conversationPid});
        }
        activeChat = {
          pid: payload.conversationPid,
          field: 'pid'
        };
      }
      if (payload.userPid) {
        targetChat = state.chats.find(chat => chat.userPid === payload.userPid);
        if (!targetChat) {
          targetChat = {
            userPid: payload.userPid,
            participants: payload.participants,
            messages: []
          };
          state.chats.push(targetChat);
        }
        activeChat = {
          pid: payload.userPid,
          field: 'userPid'
        };
      }
      if (targetChat) {
        const targetMessages = targetChat.messages || [];
        const payloadMessages = payload.messages || [];
        payloadMessages.forEach((newMessage) => {
          const hasMessage = targetMessages.find((mess) => mess.pid === newMessage.pid);
          if (!hasMessage) {
            targetMessages.push(newMessage);
          }
        });
        targetChat.messages = targetMessages;
      }
      state.activeChat = activeChat;
      return {...state};
    default:
      return state;
  }

}

export const getChatState = createFeatureSelector<State>('chat');
export const _getChats = (state: State) => state.chats;
export const _getIndicator = (state: State) => (state) ? state.indicator : null;
export const _getActiveChat = (state: State) => {
  const activeChat: ActiveChatState = state.activeChat;
  if (activeChat) {
    return state.chats.find(chat => chat[activeChat.field] === activeChat.pid);
  } else {
    return {};
  }
};

const getIndicator = createSelector(getChatState, _getIndicator);

export const getChats = createSelector(getChatState, _getChats);
export const getActiveChat = createSelector(getChatState, _getActiveChat);

export const ChatSelectors = {
  getIndicator
};
