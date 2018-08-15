import { Component, OnInit, Input } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { FindingListItem } from '../../../../../../models/IAP/annual-assurance-plan/assurance-plan/checklist/finding/findinglist-item.model';

@Component({
  selector: 'iap-checklist-findings-view-item',
  templateUrl: './checklist-findings-view-item.component.html',
  styleUrls: ['./checklist-findings-view-item.component.scss']
})
export class ChecklistFindingsViewItemComponent implements OnInit {
  @Input() findingItem: FindingListItem;
  constructor() { }

  ngOnInit() {
  }

}
