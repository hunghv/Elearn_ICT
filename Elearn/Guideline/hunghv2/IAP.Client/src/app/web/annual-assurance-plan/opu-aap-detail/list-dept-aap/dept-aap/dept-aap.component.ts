import { Component, OnInit, Input } from '@angular/core';
import { DeptAAP } from '../../../../../shared/models/IAP/annual-assurance-plan/departmentAAP.model';

@Component({
  selector: 'iap-dept-aap',
  templateUrl: './dept-aap.component.html',
  styleUrls: ['./dept-aap.component.scss']
})
export class DeptAapComponent implements OnInit {

  @Input() deptAAP : DeptAAP;
  constructor() { }

  ngOnInit() {
  }

}
