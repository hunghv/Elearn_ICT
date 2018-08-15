import { Component, OnInit, ElementRef } from '@angular/core';
import { DepartmentSubmissionModel } from './department-submission/department-submission.model';
import { SummaryService } from '../../../../shared/services/IAP/summary/summary.service';
import { SummaryFilterModel } from '../../../../shared/models/IAP/summary/summary-filter.model';
import { AuthService } from '../../../../shared/services/authentication/auth.service';

@Component({
  selector: 'iap-submission-summary-tab',
  templateUrl: './submission-summary-tab.component.html',
  styleUrls: ['./submission-summary-tab.component.scss']
})
export class SubmissionSummaryTabComponent implements OnInit {

  filterModel: SummaryFilterModel;

  lstChartData: any[] = [];

  lstDepartmentSubmissionData: DepartmentSubmissionModel[] = [];

  isChartView = false;
  assuranceYear: number;

  constructor(public service: SummaryService,
    public userService: AuthService) {

    this.lstDepartmentSubmissionData = [
      {
        departmentName: 'Department A',
        assuranceLine: 'First Line',
        totalLineItems: 123,
        status: 'Draft',
      },
      {
        departmentName: 'Department B',
        assuranceLine: 'First Line',
        totalLineItems: 123,
        status: 'Submitted',
      },
      {
        departmentName: 'Department C',
        assuranceLine: 'First Line',
        totalLineItems: 0,
        status: 'Not Created',
      },
      {
        departmentName: 'Department D',
        assuranceLine: 'First Line',
        totalLineItems: 123,
        status: 'Draft',
      },
    ];
  }

  ngOnInit() {
    this.assuranceYear = new Date().getFullYear();
    const userModel = this.userService.getUserInformation();
    this.filterModel = {
      opu: userModel.opu.id
    };
  }

  searchChart() {
    this.service.getSummaryChartView(this.filterModel).subscribe((data: any) => {
      console.log(data);
      if (data && data.result && data.result.listChart) {
        const result = data.result.listChart;
        this.lstChartData = result;
      }
    });
  }

  searchListing() {
    this.service.getSummaryListingView(this.filterModel).subscribe((data: any) => {
      console.log(data);
    });
  }
}


