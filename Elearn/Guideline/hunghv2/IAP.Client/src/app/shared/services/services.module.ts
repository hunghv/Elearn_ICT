import { FormArray } from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule, DatePipe, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BaseRequestOptions } from '@angular/http';
import { DialogHelperService } from './dialog-helper/dialog-helper.service';
import { BackgroundLoader } from './background-loader/background-loader.service';
import { IapHttpClient } from './iap-http-client/iap-http-client.service';
import { AppConfigService } from './app-config/app-config.service';
import { DataService } from './data-service/data-service.service';
import { ScrollToElementService } from './scroll-to-element/scroll-to-element.service';
import { BreadscrumbResolver } from './breadscrumb-resolver/breadscrumb-resolver.service';
import { AssurancePlanService } from './IAP/annual-assurance-plan/assurance-plan/assurance-plan.service';
import { NotificationDialogComponent } from '../components/notification-dialog/notification-dialog.component';
import { SharedComponentModule } from '../components/shared-component.module';
import { CommonService } from './common/common.service';
import { InterceptorsModule } from '../interceptors/interceptors.module';
import { AssessorService } from './IAP/annual-assurance-plan/assurance-plan/assessor-service/assessor.service';
import { OpuService } from './IAP/annual-assurance-plan/opu.service';
import { ActionItemService } from './IAP/action-item/action-item.service';
import { FindingService } from './IAP/annual-assurance-plan/assurance-plan/checklist-service/finding-service/finding.service';
import { DepartmentAapService } from './IAP/annual-assurance-plan/department-aap/department-aap.service';
import { LocationService } from './IAP/master-data/location.service';
import { AttachmentService } from './attachment/attachment.service';
import { BrowserLocationService } from './browser-location/browser-location.service';
import { UserProfileService } from './IAP/profile/user-profile.service';
import { AssuranceLineService } from './IAP/master-data/assurance-line.service';
import { RiskAreaService } from './IAP/master-data/risk-area.service';
import { DeptAAPItemService } from './IAP/annual-assurance-plan/department-aap-item/dept-aap-item.service';
import { AssuranceTypeService } from './IAP/master-data/assurance-type.service';
import { ChecklistItemService } from './IAP/annual-assurance-plan/assurance-plan/checklist-service/checklist-item.service';
import { CheckListFcService } from './IAP/master-data/check-list.service';
import { EnterpriseService } from './IAP/master-data/assessee.service.';
import { MDUserProfileService } from './IAP/profile/md-user-profile.service';
import { MyTaskService } from './data-service/task.service';
import { MdAuditorService } from './IAP/master-data/mdAuditor.service';
import { ApHeadAndFocalPersonService } from './IAP/master-data/apHeadAndFocalPerson.service';
import { AssuranceProviderService } from './IAP/annual-assurance-plan/assurance-plan/assurance-provider-service/assurance-provider-service';
import { SummaryService } from './IAP/summary/summary.service';
import { ActionItemProgressService } from './IAP/action-item/update-progress.service/update-progress.service';
import { DashboardService } from './data-service/dashboard.service';
import { MasterDataService } from './IAP/master-data/masterdata.service';
import { UserRatingMappingService } from './IAP/annual-assurance-plan/assurance-plan/user-rating-mapping.service';
import { SingletonService } from './common/singleton.service';
// import { RiskAreaService } from './IAP/master-data/risk-area.service';

/**
* Exported function so that it works with AOT
* @param {AppConfigService} configService
* @returns {Function}
*/
export function loadConfigService(configService: AppConfigService): Function {
  return () => {
    return configService.load();
  };
}

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule, InterceptorsModule
  ],
  declarations: [
  ],
  providers: [
  ],
  entryComponents: [
    NotificationDialogComponent
  ]
})
export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
        DatePipe,
        CommonService,
        SingletonService,
        BaseRequestOptions,
        DialogHelperService,
        BackgroundLoader,
        IapHttpClient,
        AppConfigService,
        { provide: APP_INITIALIZER, useFactory: loadConfigService, deps: [AppConfigService], multi: true },
        ScrollToElementService,
        BreadscrumbResolver,
        MyTaskService,
        DepartmentAapService,
        OpuService,
        AssurancePlanService,
        AssessorService,
        ActionItemService,
        FindingService,
        LocationService,
        AssuranceTypeService,
        AssuranceLineService,
        CheckListFcService,
        // RiskAreaService,
        BrowserLocationService,
        AttachmentService,
        MDUserProfileService,
        RiskAreaService,
        DeptAAPItemService,
        ChecklistItemService,
        EnterpriseService,
        UserProfileService,
        MdAuditorService,
        ApHeadAndFocalPersonService,
        AssuranceProviderService,
        SummaryService,
        ActionItemProgressService,
        DashboardService,
        MasterDataService,
        UserRatingMappingService
      ]
    };
  }
}

