export interface ConversationMessageType {
  pid: string;
  message: string;
  createdAt: string;
  readAt?: string;
  senderPid: string;
  conversationPid: string;
}
