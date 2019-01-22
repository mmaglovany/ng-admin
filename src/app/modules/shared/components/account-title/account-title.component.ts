import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'lq-account-title',
  templateUrl: './account-title.component.html',
  styleUrls: ['./account-title.component.scss'],
})
export class AccountTitleComponent {

  @Input() account: any;

  constructor() {
  }

}
