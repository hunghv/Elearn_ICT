import { Component, OnInit, Input } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { FindingListItem } from '../../../../../../models/IAP/annual-assurance-plan/assurance-plan/checklist/finding/findinglist-item.model';
// tslint:disable-next-line:max-line-length

@Component({
  selector: 'iap-checklist-cap-findings-item',
  templateUrl: './checklist-cap-findings-item.component.html',
  styleUrls: ['./checklist-cap-findings-item.component.scss']
})
export class ChecklistCapFindingsItemComponent implements OnInit {
@Input() findingItem: FindingListItem;
  constructor() { }

  ngOnInit() {
  }

}
