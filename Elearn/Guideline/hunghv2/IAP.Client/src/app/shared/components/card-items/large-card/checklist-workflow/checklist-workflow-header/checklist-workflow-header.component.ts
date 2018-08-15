import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { AssurancePlanFirstLineMsLeadAccessorReportApprover } from '../../../../../models/IAP/annual-assurance-plan/assurance-plan/checklist/finding/checklist-ms-lead-accessor-report-approver.model';
import { ChecklistItemApproverReview } from '../../../../../models/IAP/annual-assurance-plan/assurance-plan/checklistapproverview/checklist-item-approver-view.model';

@Component({
  selector: 'iap-checklist-workflow-header',
  templateUrl: './checklist-workflow-header.component.html',
  styleUrls: ['./checklist-workflow-header.component.scss']
})
export class ChecklistWorkflowHeaderComponent implements OnInit {

  @Output() expand: EventEmitter<any> = new EventEmitter();
  @Output() collapse: EventEmitter<any> = new EventEmitter();
  @Input() firstLineMsCapApproverView: AssurancePlanFirstLineMsLeadAccessorReportApprover;
  @Input() firstLineMsLeadAccessorReportApprover: AssurancePlanFirstLineMsLeadAccessorReportApprover;
  @Input() checklistItemFC: ChecklistItemApproverReview;

  isExpand = true;

  constructor() { }

  ngOnInit() {
  }

  toggleCard() {
    this.isExpand = !this.isExpand;
    if (this.isExpand) {
      this.expand.emit();
    } else {
      this.collapse.emit();
    }
  }

}
