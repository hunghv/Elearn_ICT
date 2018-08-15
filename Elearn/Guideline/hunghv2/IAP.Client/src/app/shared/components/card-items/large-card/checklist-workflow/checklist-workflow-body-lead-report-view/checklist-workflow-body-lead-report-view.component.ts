import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FindingListItem } from '../../../../../models/IAP/annual-assurance-plan/assurance-plan/checklist/finding/findinglist-item.model';
// tslint:disable-next-line:max-line-length
import { AssurancePlanFirstLineMsLeadAccessorReportApprover } from '../../../../../models/IAP/annual-assurance-plan/assurance-plan/checklist/finding/checklist-ms-lead-accessor-report-approver.model';

@Component({
  selector: 'iap-checklist-workflow-body-lead-report-view',
  templateUrl: './checklist-workflow-body-lead-report-view.component.html',
  styleUrls: ['./checklist-workflow-body-lead-report-view.component.scss']
})
export class ChecklistWorkflowBodyLeadReportViewComponent implements OnInit {
  @Input() firstLineMsLeadAccessorReportApproverItem: AssurancePlanFirstLineMsLeadAccessorReportApprover;
  @ViewChild('body', { read: ElementRef }) body: ElementRef;

  bodyElement: HTMLElement;
  bodyHeight: number;
  // isExpand: boolean;
  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line:no-unused-expression
    // this.isExpand = true;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  // ngAfterViewInit() {
  //   this.bodyElement = this.body.nativeElement;
  //   if (this.bodyElement) {
  //     this.bodyHeight = this.bodyElement.scrollHeight;
  //     this.bodyElement.style.height = `${this.bodyHeight}px`;
  //   }
  // }

  handleExpand() {
    // this.isExpand = true;
    this.bodyElement.style.height = `${this.bodyHeight}px`;
  }

  handleCollapse() {
    // this.isExpand = false;
    this.bodyElement.style.height = `0px`;
  }
}
