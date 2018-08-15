import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'iap-aap-summary-content',
  templateUrl: './aap-summary-content.component.html',
  styleUrls: ['./aap-summary-content.component.scss']
})
export class AapSummaryContentComponent implements OnInit {

  @Input() selectedIndex: number;

  constructor() { }

  ngOnInit() {
  }

}
