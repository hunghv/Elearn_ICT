import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AssuranceProviderModel } from '../../../../models/IAP/assurance-provider/assurance-provider.model';
import { AssurancePlan } from '../../../../models/IAP/annual-assurance-plan/assurance-plan.model';
import { Router } from '@angular/router';
import { HelperModule } from '../../../../helper/helper.module';

@Component({
  selector: 'iap-apd',
  templateUrl: './apd.component.html',
  styleUrls: ['./apd.component.scss']
})
export class ApdComponent implements OnInit {

  @Input() data: AssuranceProviderModel;
  assurance: AssurancePlan;
  @Input() assurancePlanId: string;
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {

  }

  handleDeleteItem(id) {
    this.onDeleteClick.emit(this.data);
  }

}
