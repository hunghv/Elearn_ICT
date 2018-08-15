import { Component, OnInit, Input } from '@angular/core';
import { UserControlInfo } from '../../../../../../models/common.model';
import { FirstLineFcAssignActionPartyViewFindingItemModel } from '../../../../../../models/IAP/annual-assurance-plan/assurance-plan/first-line-fc-assign-action-party-view';

@Component({
  selector: 'iap-checklist-findings-item',
  templateUrl: './checklist-findings-item.component.html',
  styleUrls: ['./checklist-findings-item.component.scss']
})
export class ChecklistFindingsItemComponent implements OnInit {
  @Input() finding: FirstLineFcAssignActionPartyViewFindingItemModel;

  actionParty: UserControlInfo = new UserControlInfo();

  constructor() { }

  ngOnInit() {
  }

}
