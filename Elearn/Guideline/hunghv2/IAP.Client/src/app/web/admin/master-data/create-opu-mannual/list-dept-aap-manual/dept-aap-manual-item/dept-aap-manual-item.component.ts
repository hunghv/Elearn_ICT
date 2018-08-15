import { Component, OnInit, Input } from '@angular/core';
import { DeptAAP } from '../../../../../../shared/models/IAP/annual-assurance-plan/departmentAAP.model';

@Component({
  selector: 'iap-dept-aap-manual-item',
  templateUrl: './dept-aap-manual-item.component.html',
  styleUrls: ['./dept-aap-manual-item.component.scss']
})
export class DeptAapManualItemComponent implements OnInit {
  @Input() deptAAP : DeptAAP;

  constructor() { }

  ngOnInit() {
  }

}
