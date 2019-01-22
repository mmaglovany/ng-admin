export interface PostTicketMessage {
  ticket: {
    pid: string;
  };
  message: string;
  status: string;
}
