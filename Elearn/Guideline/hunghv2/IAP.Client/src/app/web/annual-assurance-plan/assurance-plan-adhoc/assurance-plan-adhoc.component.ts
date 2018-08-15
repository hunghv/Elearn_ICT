import { Component, OnInit } from '@angular/core';
import { AssuranceTypeService } from '../../../shared/services/IAP/master-data/assurance-type.service';
import { AssuranceLineService } from '../../../shared/services/IAP/master-data/assurance-line.service';
import { RiskAreaService } from '../../../shared/services/IAP/master-data/risk-area.service';


@Component({
  selector: 'iap-assurance-plan-adhoc',
  templateUrl: './assurance-plan-adhoc.component.html',
  styleUrls: ['./assurance-plan-adhoc.component.scss']
})
export class AssurancePlanAdhocComponent implements OnInit {
  constructor () {
  }

  ngOnInit() {
  }

}
