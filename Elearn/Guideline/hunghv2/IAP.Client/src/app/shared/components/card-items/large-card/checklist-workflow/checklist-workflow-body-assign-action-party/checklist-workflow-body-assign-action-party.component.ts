import { Component, OnInit, Input } from '@angular/core';
import { AssurancePlanService } from '../../../../../services/IAP/annual-assurance-plan/assurance-plan/assurance-plan.service';
import { FirstLineFcAssignActionPartyViewQuestionModel } from '../../../../../models/IAP/annual-assurance-plan/assurance-plan/first-line-fc-assign-action-party-view';

@Component({
  selector: 'iap-checklist-workflow-body-assign-action-party',
  templateUrl: './checklist-workflow-body-assign-action-party.component.html',
  styleUrls: ['./checklist-workflow-body-assign-action-party.component.scss']
})
export class ChecklistWorkflowBodyAssignActionPartyComponent implements OnInit {
  @Input() question: FirstLineFcAssignActionPartyViewQuestionModel;

  constructor(private assurancePlanService: AssurancePlanService) { }

  ngOnInit() {
  }

}
