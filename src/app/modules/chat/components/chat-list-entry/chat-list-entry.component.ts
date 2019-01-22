import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'lq-chat-list-entry',
  templateUrl: './chat-list-entry.component.html',
  styleUrls: ['./chat-list-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChatListEntryComponent implements OnInit, OnChanges {

  @Input() chat: any;
  @Input() filterUserPid: string;
  @Output() onClick = new EventEmitter();

  constructor() {
  }

  public data = {
    title: '',
    filteredParticipants: [],
    avatar: ''
  };

  ngOnInit() {
  }

  get author() {
    if (this.chat && this.chat.lastMessage && this.chat.lastMessage.senderPid) {
      return this.chat.participants.find(participants => participants.pid === this.chat.lastMessage.senderPid);
    }
    return 'New chat...';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data.filteredParticipants = this.chat.participants.filter((participant) => participant.pid !== this.filterUserPid);
    this.data.title = this.data.filteredParticipants.map(obj => obj.username).join(', ');
    this.data.avatar = this.data.filteredParticipants[0].avatarURL;
  }

}
