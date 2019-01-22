import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lq-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {

  @Input() account: any;

  constructor() {
  }

  ngOnInit() {
  }

}
