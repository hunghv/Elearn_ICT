import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ChecklistItem } from '../../../../shared/models/IAP/annual-assurance-plan/assurance-plan/checklist/checklist-item.model';
import { AssurancePlanService } from '../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/assurance-plan.service';
import { ChecklistItemApproverReview } from '../../../../shared/models/IAP/annual-assurance-plan/assurance-plan/checklistapproverview/checklist-item-approver-view.model';

@Component({
  selector: 'iap-list-checklist-item-approver-view',
  templateUrl: './list-checklist-item-approver-view.component.html',
  styleUrls: ['./list-checklist-item-approver-view.component.scss']
})
export class ListChecklistItemApproverViewComponent implements OnInit , AfterViewInit{

  @ViewChild('body', { read: ElementRef }) body: ElementRef;
  @Input() assurancePlanId: string;

  listChecklist: ChecklistItemApproverReview[];
  bodyElement: HTMLElement;
  bodyHeight: number;

  constructor(private apService: AssurancePlanService, ) { }
  
  ngOnInit() {
    if (this.assurancePlanId) {
      this.apService.getChecklistApproverReview(this.assurancePlanId).subscribe(res => {
        this.listChecklist = res.listQuestions;
      });
    }

  }

  ngAfterViewInit() {
    this.bodyElement = this.body.nativeElement;
    if (this.bodyElement) {
      this.bodyHeight = this.bodyElement.scrollHeight;
      this.bodyElement.style.height = `${this.bodyHeight}px`;
    }
  }

  handleExpand() {
    this.bodyElement.style.height = `${this.bodyHeight}px`;
  }

  handleCollapse() {
    this.bodyElement.style.height = `0px`;
  }


}
