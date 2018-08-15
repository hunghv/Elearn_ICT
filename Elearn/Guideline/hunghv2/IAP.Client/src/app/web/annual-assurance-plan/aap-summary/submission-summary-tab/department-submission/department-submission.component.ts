import { Component, OnInit, Input } from '@angular/core';
import { DepartmentSubmissionModel } from './department-submission.model';

@Component({
  selector: 'iap-department-submission',
  templateUrl: './department-submission.component.html',
  styleUrls: ['./department-submission.component.scss']
})
export class DepartmentSubmissionComponent implements OnInit {

  @Input() data: DepartmentSubmissionModel;

  constructor() { }

  ngOnInit() {
  }

}
