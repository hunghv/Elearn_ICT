import { Component, OnInit, Input } from '@angular/core';
import { LIST_MONTH } from '../../../../../shared/constants/common.constants';

@Component({
  selector: 'iap-resource-loading-card',
  templateUrl: './resource-loading-card.component.html',
  styleUrls: ['./resource-loading-card.component.scss']
})
export class ResourceLoadingCardComponent implements OnInit {

  @Input() data: any;
  months: string[] = LIST_MONTH;
  constructor() { }

  ngOnInit() {
  }

}
