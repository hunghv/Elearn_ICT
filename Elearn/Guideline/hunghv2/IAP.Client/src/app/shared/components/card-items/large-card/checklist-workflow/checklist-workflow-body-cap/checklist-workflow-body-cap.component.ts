import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { AssurancePlanFirstLineMsLeadAccessorReportApprover } from '../../../../../models/IAP/annual-assurance-plan/assurance-plan/checklist/finding/checklist-ms-lead-accessor-report-approver.model';
// tslint:disable-next-line:max-line-length
@Component({
  selector: 'iap-checklist-workflow-body-cap',
  templateUrl: './checklist-workflow-body-cap.component.html',
  styleUrls: ['./checklist-workflow-body-cap.component.scss']
})
export class ChecklistWorkflowBodyCapComponent implements OnInit {
  @Input() firstLineMsLeadAccessorReportApproverItem: AssurancePlanFirstLineMsLeadAccessorReportApprover;
  @ViewChild('body', { read: ElementRef }) body: ElementRef;

  bodyElement: HTMLElement;
  bodyHeight: number;
  constructor() { }

  ngOnInit() {
    console.log(this.firstLineMsLeadAccessorReportApproverItem);
  }
  // ngAfterViewInit() {
  //   this.bodyElement = this.body.nativeElement;
  //   if (this.bodyElement) {
  //     this.bodyHeight = this.bodyElement.scrollHeight;
  //     this.bodyElement.style.height = `${this.bodyHeight}px`;
  //   }
  // }

  handleExpand() {
    this.bodyElement.style.height = `${this.bodyHeight}px`;
  }

  handleCollapse() {
    this.bodyElement.style.height = `0px`;
  }
}
