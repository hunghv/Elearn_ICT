import { Component, OnInit, Input } from '@angular/core';
import { ChecklistItemApproverReview } from '../../../../../shared/models/IAP/annual-assurance-plan/assurance-plan/checklistapproverview/checklist-item-approver-view.model';

@Component({
  selector: 'iap-checklist-workflow-body-approver-view',
  templateUrl: './checklist-workflow-body-approver-view.component.html',
  styleUrls: ['./checklist-workflow-body-approver-view.component.scss']
})
export class ChecklistWorkflowBodyApproverViewComponent implements OnInit {
  @Input() checklistItemFC: ChecklistItemApproverReview;
  constructor() { }

  ngOnInit() {
    // debugger;
    let abc = this.checklistItemFC;
  }

}
