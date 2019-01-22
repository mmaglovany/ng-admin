import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {DialogWindow} from '../../../shared/modal-window/modal-window.module';
import {SupportService} from '../../services/support.service';
import {Logger} from '../../../../core/services/logger.service';

@Component({
  selector: 'lq-support-attachments',
  templateUrl: './support-attachments.component.html',
  styleUrls: ['./support-attachments.component.scss']
})
export class SupportAttachmentsComponent implements OnInit {

  @Input() attachments = [];

  constructor(private dialogWindow: DialogWindow,
              public viewContainerRef: ViewContainerRef,
              public supportService: SupportService,
              private logger: Logger
  ) {
  }

  ngOnInit() {
  }

  doShowAttachment(url) {
    this.supportService.loadAttachment({url}).toPromise().then((data) => {
      const reader = new FileReader();
      reader.onload = (data64: any) => {
        this.dialogWindow.open({
          ref: this.viewContainerRef,
          title: 'Attachment',
          content: `<div class="row flex-items-xs-center"><img src="${data64.target.result}"/></div>`,
        });
      };
      reader.readAsDataURL(data);
    }).catch((err) => this.logger.error({err}));
  }

}
