import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lq-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() ownerPid: string;
  @Input() message: any;
  @Input() participant: any;
  @Output() onUnread: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    if (!this.message.isRead) {
      this.onUnread.emit(this.message);
    }
  }

}
