import {AfterViewChecked, Component, DoCheck, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ChatMessageType} from '../../interfaces/chat-message-type';
import {Store} from '@ngrx/store';
import {State} from '../../../../core/reducers/app.reducer';
import {ChatActions} from '../../store/chat.actions';
import minBy from 'lodash-es/minBy';
import trim from 'lodash-es/trim';
import trimStart from 'lodash-es/trimStart';

@Component({
  selector: 'lq-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements DoCheck, AfterViewChecked, OnInit {
  @ViewChild('chatBlock') private chatBlock: ElementRef;

  @Input() ownerPid: string;
  @Input() chat: any;

  private _chatLength = 0;
  private _doScroll = false;
  private _onLoadMore = false;

  public messages: ChatMessageType[] = [];

  public messageForm = this.formBuilder.group({
    message: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder,
              private store$: Store<State>) {
  }

  getParticipant(message) {
    return this.chat.participants.find(participant => participant.pid === message.senderPid);
  }

  onUnread(message) {
    this.store$.dispatch(new ChatActions.MarkMessageAsRead({
      conversationPid: this.chat.pid,
      messagePid: message.pid
    }));
  }

  doSend() {
    if (this.messageForm.invalid) {
      return;
    }
    const message = trim(this.messageForm.value.message);
    const extraData: any = {};
    if (this.chat.pid) {
      extraData.conversationPid = this.chat.pid;
    }
    if (this.chat.userPid) {
      extraData.userPid = this.chat.userPid;
    }
    this.store$.dispatch(new ChatActions.DoSendMessage({message: {message, ...extraData}}));
    this.messageForm.get('message').setValue('');
  }

  ngDoCheck(): void {
    if (this.chat && this.chat.messages) {
      if (this._chatLength !== this.chat.messages.length) {
        this._chatLength = this.chat.messages.length;
        this._doScroll = true;
      }
    }
  }

  scrollToBottom(): void {
    this._doScroll = false;
    try {
      this.chatBlock.nativeElement.scrollTop = this.chatBlock.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  ngAfterViewChecked(): void {
    if (this._doScroll && !this._onLoadMore) {
      this.scrollToBottom();
    }
  }

  onScroll(event) {
    if (event.target.scrollTop === 0 && this.chat.messages && this.chat.messages[0]) {
      this._onLoadMore = true;
      const offsetMessage: any = minBy(this.chat.messages, 'createdAt');
      const dateOffset: string = offsetMessage.createdAt;
      this.store$.dispatch(new ChatActions.DoLoadChat({
        conversationPid: this.chat.pid,
        fromDate: dateOffset
      }));
      event.target.scrollTo({top: 1});
    }
  }

  ngOnInit(): void {
    const messageControl = this.messageForm.get('message');
    messageControl.valueChanges.forEach((value: string) => {
      messageControl.patchValue(trimStart(value), {emitEvent: false});
    });
  }

}
