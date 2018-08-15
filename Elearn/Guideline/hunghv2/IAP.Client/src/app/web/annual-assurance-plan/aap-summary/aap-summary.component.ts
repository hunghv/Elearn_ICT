import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabRouteName } from '../../../shared/constants/summary-tab.constants';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'iap-aap-summary',
  templateUrl: './aap-summary.component.html',
  styleUrls: ['./aap-summary.component.scss'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class AapSummaryComponent implements OnInit {

  summaryName: string;
  selectedIndex = 0;
  constructor(private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.summaryName = params['tab'];
      switch (this.summaryName) {
        case TabRouteName.RESOURCE_LOADING: {
          this.selectedIndex = 0;
          break;
        }
        case TabRouteName.CALENDAR: {
          this.selectedIndex = 1;
          break;
        }
        case TabRouteName.SUMMAR_SUBMISSION: {
          this.selectedIndex = 2;
          break;
        }
        default: break;
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
