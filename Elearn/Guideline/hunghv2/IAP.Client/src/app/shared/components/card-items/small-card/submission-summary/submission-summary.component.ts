import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'iap-submission-summary',
  templateUrl: './submission-summary.component.html',
  styleUrls: ['./submission-summary.component.scss']
})
export class SubmissionSummaryComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
