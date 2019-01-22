import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'lq-verify-status',
  templateUrl: './verify-status.component.html',
  styleUrls: ['./verify-status.component.scss']
})
export class VerifyStatusComponent implements OnInit {

  @Input() type: string;
  @Input() verifyData: any[];
  public targetVerifyData: any = null;

  LABELS = {
    ACCEPTED: 'label-success',
    WAITING: 'label-warning',
    REJECTED: 'label-danger'
  };

  constructor() {
  }

  ngOnInit() {
    const targetVerifyData = this.verifyData.find((verifyData) => verifyData.type === this.type);
    if (targetVerifyData) {
      this.targetVerifyData = {
        date: targetVerifyData.updated_at,
        verifyResult: targetVerifyData.verifyResult,
        labelType: this.LABELS[targetVerifyData.verifyResult],
        pid: targetVerifyData.pid
      };
    }
  }

}
