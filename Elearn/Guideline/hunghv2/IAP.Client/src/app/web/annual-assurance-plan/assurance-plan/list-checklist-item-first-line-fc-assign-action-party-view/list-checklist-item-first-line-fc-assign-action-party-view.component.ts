import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AssurancePlanService } from '../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/assurance-plan.service';
import { FirstLineFcAssignActionPartyViewModel } from '../../../../shared/models/IAP/annual-assurance-plan/assurance-plan/first-line-fc-assign-action-party-view';

@Component({
  selector: 'iap-list-checklist-item-first-line-fc-assign-action-party-view',
  templateUrl: './list-checklist-item-first-line-fc-assign-action-party-view.component.html',
  styleUrls: ['./list-checklist-item-first-line-fc-assign-action-party-view.component.scss']
})
export class ListChecklistItemFirstLineFcAssignActionPartyViewComponent implements OnInit {
  @ViewChild('body', { read: ElementRef }) body: ElementRef;
  @Input() assurancePlanId: string;

  public data: FirstLineFcAssignActionPartyViewModel = new FirstLineFcAssignActionPartyViewModel();
  bodyElement: HTMLElement;
  bodyHeight: number;

  constructor(private assurancePlanService: AssurancePlanService) { }

  ngOnInit() {
    if (this.assurancePlanId) {
      this.assurancePlanService.getFirstLineFcAssignActionPartyView(this.assurancePlanId).subscribe(res => {
        this.data = res;
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
