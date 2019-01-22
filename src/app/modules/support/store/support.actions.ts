import {PostTicketMessage} from '../intarfaces/post-ticket-message';

export const DO_LIST_TICKETS = '[support] Get list of tickets.';
export const ON_LIST_TICKETS = '[support] Loaded list of tickets.';
export const DO_LOAD_TICKET = '[support] Load tickets.';
export const ON_LOAD_TICKET = '[support] Loaded tickets.';
export const DO_SEND_MESSAGE = '[support] Add message to ticket.';
export const ON_SEND_MESSAGE = '[support] saved message to ticket.';
export const ON_SEND_MESSAGE_ERROR = '[support] Error save message to ticket.';

export class DoLoadTicketsList {
  readonly type = DO_LIST_TICKETS;
}

export class OnLoadTicketsList {
  readonly type = ON_LIST_TICKETS;

  constructor(public payload: any) {
  }
}

export class DoLoadTicket {
  readonly type = DO_LOAD_TICKET;

  constructor(public payload: any) {
  }
}

export class OnLoadTicket {
  readonly type = ON_LOAD_TICKET;

  constructor(public payload: any) {
  }
}

export class DoSendMessage {
  readonly type = DO_SEND_MESSAGE;

  constructor(public payload: PostTicketMessage) {
  }
}

export class OnSendMessage {
  readonly type = ON_SEND_MESSAGE;

  constructor(public payload: any) {
  }
}

export class OnSendMessageError {
  readonly type = ON_SEND_MESSAGE_ERROR;
  constructor(public payload: any) {
  }
}

export type SupportActions = DoLoadTicketsList;
