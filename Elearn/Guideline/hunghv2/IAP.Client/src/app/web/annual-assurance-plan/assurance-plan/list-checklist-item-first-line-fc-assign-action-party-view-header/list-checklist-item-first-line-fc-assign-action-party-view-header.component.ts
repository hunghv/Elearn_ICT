import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FirstLineFcAssignActionPartyViewQuestionModel } from '../../../../shared/models/IAP/annual-assurance-plan/assurance-plan/first-line-fc-assign-action-party-view';

@Component({
  selector: 'iap-list-checklist-item-first-line-fc-assign-action-party-view-header',
  templateUrl: './list-checklist-item-first-line-fc-assign-action-party-view-header.component.html',
  styleUrls: ['./list-checklist-item-first-line-fc-assign-action-party-view-header.component.scss']
})
export class ListChecklistItemFirstLineFcAssignActionPartyViewHeaderComponent implements OnInit {

  @Output() expand: EventEmitter<any> = new EventEmitter();
  @Output() collapse: EventEmitter<any> = new EventEmitter();
  @Input() question: FirstLineFcAssignActionPartyViewQuestionModel;

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

