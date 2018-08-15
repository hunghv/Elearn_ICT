import { Component, OnInit, Input } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { ChecklistCapActionItem } from '../../../../../../../models/IAP/annual-assurance-plan/assurance-plan/checklist/finding/findinglist-item.model';

@Component({
  selector: 'iap-checklist-cap-action-item',
  templateUrl: './checklist-cap-action-item.component.html',
  styleUrls: ['./checklist-cap-action-item.component.scss']
})
export class ChecklistCapActionItemComponent implements OnInit {
 @Input() checklistCapActionItem: ChecklistCapActionItem;
  constructor() { }

  ngOnInit() {
  }

}
