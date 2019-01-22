import {ConversationParticipantType} from './conversation-participant-type';
import {ConversationMessageType} from './conversation-message-type';

export interface ConversationHistoryCallbackType {
  messages: ConversationMessageType[];
  participants: ConversationParticipantType[];
}
