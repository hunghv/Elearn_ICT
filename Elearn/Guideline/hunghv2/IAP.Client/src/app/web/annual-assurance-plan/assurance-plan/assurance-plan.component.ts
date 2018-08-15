import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { AssurancePlanService } from '../../../shared/services/IAP/annual-assurance-plan/assurance-plan/assurance-plan.service';
import { AssurancePlan } from '../../../shared/models/IAP/annual-assurance-plan/assurance-plan.model';
import { UserInformation } from '../../../shared/models/user.model';
import { ParentFindingType } from '../../../shared/constants/common.constants';
import { FindingListItem } from '../../../shared/models/IAP/annual-assurance-plan/assurance-plan/checklist/finding/findinglist-item.model';
// tslint:disable-next-line:max-line-length
import { AssurancePlanFirstLineMsLeadAccessorReportApprover } from '../../../shared/models/IAP/annual-assurance-plan/assurance-plan/checklist/finding/checklist-ms-lead-accessor-report-approver.model';
import { SingletonService } from '../../../shared/services/common/singleton.service';

@Component({
  selector: 'iap-assurance-plan',
  templateUrl: './assurance-plan.component.html',
  styleUrls: ['./assurance-plan.component.scss']
})
export class AssurancePlanComponent implements OnInit, AfterViewInit {
  selectedTab: number;
  isSubmitter = false;
  leadassessor = false;
  approver = false;
  apAssigner = false;
  userInformation: UserInformation;
  parentFindingType = ParentFindingType.AssurancePlan;

  assurance: AssurancePlan = new AssurancePlan();
  firstLineMsLeadAccessorReportApproverItems: AssurancePlanFirstLineMsLeadAccessorReportApprover[];
  firstLineMsEndorserApproverViews: AssurancePlanFirstLineMsLeadAccessorReportApprover[];
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private http: Http,
    private apService: AssurancePlanService,
    private singletonService: SingletonService
  ) {
    this.selectedTab = this.singletonService.assurancePlanTabId;
  }

  ngOnInit() {
    this.userInformation = this.authService.getUserInformation();

    this.route.paramMap.subscribe(params => {
      this.assurance.id = params.get('id');
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.apService.getById(id).
        subscribe(res => {
          // debugger;
          this.assurance = res;
          // console.log(this.assurance);
        });
      this.apService.getFirstLineMsLeadAccessorReportApproverView(id)
        .subscribe(res => {
          this.firstLineMsLeadAccessorReportApproverItems = res.listSections;
        });
      this.apService.getFirstLineMsEndorserApproverView(id)
        .subscribe(res => {
          this.firstLineMsEndorserApproverViews = res.listSections;
        });
    });

    this.isShow();
  }

  ngAfterViewInit() {
    this.selectedTab = 1;
  }

  changeListContent(index) {
    this.selectedTab = index;
    this.singletonService.assurancePlanTabId = index;
  }

  isShow() {
    if (this.userInformation.listUserRoles.indexOf('Submitter') !== -1) {
      this.isSubmitter = true;
    } else if (this.userInformation.listUserRoles.indexOf('LeadAssessor') !== -1) {
      this.leadassessor = true;
    } else if (this.userInformation.listUserRoles.indexOf('Approver') !== -1) {
      this.approver = true;
    } else if (this.userInformation.listUserRoles.indexOf('ActionPartyAssigner') !== -1) {
      this.apAssigner = true;
    }
  }
}
