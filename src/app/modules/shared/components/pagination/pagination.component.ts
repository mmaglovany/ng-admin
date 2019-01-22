import {Component, Input, OnInit} from '@angular/core';
import {PaginationType} from './pagination-type.interface';

@Component({
  selector: 'lq-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pagination: PaginationType;

  constructor() {
  }

  ngOnInit() {
  }

}
