import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AssurancePlan } from '../../../../shared/models/IAP/annual-assurance-plan/assurance-plan.model';

@Component({
  selector: 'iap-assurance-tab-content',
  templateUrl: './assurance-tab-content.component.html',
  styleUrls: ['./assurance-tab-content.component.scss']
})
export class AssuranceTabContentComponent implements OnInit {
  @Input() isSubmitter;

  @Input() assurancePlan: AssurancePlan;
  @Input() assuranceTypeName: AssurancePlan;
  @Output() selectedIndex: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
    console.log('helo' + this.assurancePlan);
  }

  ChangeHandler(index) {
    this.selectedIndex.emit(index);
  }
}
