import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssurancePlanComponent } from './assurance-plan/assurance-plan.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedComponentModule } from '../../shared/components/shared-component.module';
import { AssurancePlanDialogComponent } from './assurance-plan/assurance-plan-dialog/assurance-plan-dialog.component';
import { AssuranceTabContentComponent } from './assurance-plan/assurance-tab-content/assurance-tab-content.component';
import {
  FindingActionTabComponent
} from './assurance-plan/assurance-tab-content/assurance-tab/finding-action-tab/finding-action-tab.component';
import { DetailTabComponent } from './assurance-plan/assurance-tab-content/assurance-tab/detail-tab/detail-tab.component';
import {
  WorkflowTrackingTabComponent
} from './assurance-plan/assurance-tab-content/assurance-tab/workflow-tracking-tab/workflow-tracking-tab.component';
import { AssuranceTabComponent } from './assurance-plan/assurance-tab-content/assurance-tab/assurance-tab.component';
import { LayoutComponent } from '../../core/layout/layout.component';
import { CoreModule } from '../../core/core.module';
import { ListCardItemModule } from '../../shared/components/list-card-item/list-card-item.module';
import { ChecklistDetailComponent } from './assurance-plan/checklist-detail/checklist-detail.component';
import { FeatureLayoutComponent } from '../../shared/components/common/feature-layout/feature-layout.component';
import { IapCommonModule } from '../../shared/components/common/iap-common.module';
import { FindingsItemDetailComponent } from './assurance-plan/findings-item-detail/findings-item-detail.component';
import { ActionItemDetailComponent } from './assurance-plan/action-item-detail/action-item-detail.component';
import { AapSummaryComponent } from './aap-summary/aap-summary.component';
import { ResourceLoadingTabComponent } from './aap-summary/resource-loading-tab/resource-loading-tab.component';
import { CalendarTabComponent } from './aap-summary/calendar-tab/calendar-tab.component';
import { SubmissionSummaryTabComponent } from './aap-summary/submission-summary-tab/submission-summary-tab.component';
import { AapSummaryContentComponent } from './aap-summary/aap-summary-content/aap-summary-content.component';
import { DepartmentSubmissionComponent } from './aap-summary/submission-summary-tab/department-submission/department-submission.component';
import { SearchFilterDialogComponent } from './aap-summary/search-filter-dialog/search-filter-dialog.component';
import { SearchFilterComponent } from './aap-summary/search-filter-dialog/search-filter/search-filter.component';
import { ResourceLoadingCardComponent } from './aap-summary/resource-loading-tab/resource-loading-card/resource-loading-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../shared/directives/directives.module';
import { EditAssessorDialogComponent } from './assurance-plan/accessors/edit-assessor-dialog/edit-assessor-dialog.component';
import { ApComponent } from './assurance-plan/list-ap/ap/ap.component';
import { ChecklistItemComponent } from './assurance-plan/list-checklist-item/checklist-item/checklist-item.component';
import { ListAssessorComponent } from './assurance-plan/accessors/list-assessor/list-assessor.component';
import { ListChecklistItemComponent } from './assurance-plan/list-checklist-item/list-checklist-item.component';
import { ListApComponent } from './assurance-plan/list-ap/list-ap.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { DeptAapDetailComponent } from './dept-aap-detail/dept-aap-detail.component';
import { DeptAapItemDetailComponent } from './dept-aap-item-detail/dept-aap-item-detail.component';
import {
  DeptAapItemDetailContentComponent
} from './dept-aap-item-detail/dept-aap-item-detail-content/dept-aap-item-detail-content.component';
import { CreateAapItemDialogComponent } from './dept-aap-detail/create-aap-item-dialog/create-aap-item-dialog.component';
import { ListDeptAapItemComponent } from './dept-aap-detail/list-dept-aap-item/list-dept-aap-item.component';
import { MaterialModule } from '../../shared/components/common/material.module';
import { OpuAapDetailComponent } from './opu-aap-detail/opu-aap-detail.component';
import { FindingsItemComponent } from './assurance-plan/checklist-detail/list-findings-item/findings-item/findings-item.component';
import { FindingsDialogComponent } from './assurance-plan/checklist-detail/list-findings-item/findings-dialog/findings-dialog.component';
import { ListFindingsItemComponent } from './assurance-plan/checklist-detail/list-findings-item/list-findings-item.component';
import { ListActionItemComponent } from './assurance-plan/findings-item-detail/list-action-item/list-action-item.component';
import { ActionDialogComponent } from './assurance-plan/findings-item-detail/list-action-item/action-dialog/action-dialog.component';
import { AssurancePlanAdhocComponent } from './assurance-plan-adhoc/assurance-plan-adhoc.component';
// import { EditDepartmentAAPDialogComponent } from './opu-aap-detail/list-dept-aap/add-dept-aap-dialog/add-dept-aap-dialog.component';
import { ListDeptAapComponent } from './opu-aap-detail/list-dept-aap/list-dept-aap.component';
import { DeptAapComponent } from './opu-aap-detail/list-dept-aap/dept-aap/dept-aap.component';
import { AssuranceProviderDetailComponent } from './assurance-provider-detail/assurance-provider-detail.component';
import { AssurancePlanCreateComponent } from './assurance-plan/assurance-plan-create/assurance-plan-create.component';
import { AssurancePlanFilterComponent } from './assurance-plan/list-ap/assurance-plan-filter/assurance-plan-filter.component';
import { ListProgressUpdateComponent } from './assurance-plan/action-item-detail/list-progress-update/list-progress-update.component';
import {
  ProgressUpdateComponent
} from './assurance-plan/action-item-detail/list-progress-update/progress-update/progress-update.component';
import {
  ProgressUpdateDialogComponent
} from './assurance-plan/action-item-detail/list-progress-update/progress-update-dialog/progress-update-dialog.component';
import { SearchDepartmentAapComponent } from './search-department-aap/search-department-aap.component';
import { DeptAapFilterComponent } from './search-department-aap/dept-aap-filter/dept-aap-filter.component';
import {
  RequestDueDateDialogComponent
} from './assurance-plan/action-item-detail/request-due-date-dialog/request-due-date-dialog.component';
import {
  SearchFilterResultComponent
} from './aap-summary/search-filter-result/search-filter-result.component';
import { SearchDeptAapItemComponent } from './search-department-aap/search-dept-aap-item/search-dept-aap-item.component';
import { ListChecklistItemApproverViewComponent } from './assurance-plan/list-checklist-item-approver-view/list-checklist-item-approver-view.component';
import { ChecklistWorkflowBodyApproverViewComponent } from './assurance-plan/list-checklist-item-approver-view/checklist-workflow-body-approver-view/checklist-workflow-body-approver-view.component';
import { ListChecklistItemFirstLineFcAssignActionPartyViewComponent } from './assurance-plan/list-checklist-item-first-line-fc-assign-action-party-view/list-checklist-item-first-line-fc-assign-action-party-view.component';
import { ListChecklistItemFirstLineFcAssignActionPartyViewHeaderComponent } from './assurance-plan/list-checklist-item-first-line-fc-assign-action-party-view-header/list-checklist-item-first-line-fc-assign-action-party-view-header.component';

const AAProutes: Routes = [
  {
    path: '',
    component: FeatureLayoutComponent,
    children: [{
      path: '', redirectTo: '/web/annual-assurance-plan/opu-aap', pathMatch: 'full'
    }, {
      path: 'opu-aap/:id', component: OpuAapDetailComponent, data: { state: 'opu-aap' }
    }, {
      path: 'assurance-plan/:id', component: AssurancePlanComponent, data: { state: 'assurance-plan-edit' }
    }, {
      path: 'search-aap', component: SearchDepartmentAapComponent, data: { state: 'assurance-plan-edit' }
    },

    {
      path: 'assurance-plan-create', component: AssurancePlanCreateComponent, data: { state: 'assurance-plan-create' }
    },
    {
      path: 'assurance-plan/checklist/:type/:id',
      component: ChecklistDetailComponent,
      data: { state: 'checklist' }
    },
    {
      path: 'assurance-plan/checklist/findings/detail/:id',
      component: FindingsItemDetailComponent,
      data: { state: 'findings' }
    },
    {
      path: 'assurance-plan/checklist/findings/detail/:id/action-item/:id',
      component: ActionItemDetailComponent,
      data: { state: 'action-item' }
    },
    // ListProgressUpdateItemComponent
    {
      path: 'assurance-plan/:id/findings/:id',
      component: FindingsItemDetailComponent,
      data: { state: 'findings' }
    },
    {
      path: 'assurance-plan/:id/findings/:id/action-item/:id',
      component: ActionItemDetailComponent,
      data: { state: 'action-item' }
    },
    { path: 'summary', component: AapSummaryComponent, data: { state: 'summary' } },
    { path: 'summary/:tab', component: AapSummaryComponent, data: { state: 'summary' } },
    { path: 'dept-aap-detail/:id', component: DeptAapDetailComponent, data: { state: 'dept-aap-detail' } },
    { path: 'dept-aap-item-detail/:id', component: DeptAapItemDetailComponent, data: { state: 'dept-aap-item-detail' } },
    { path: 'ap-adhoc', component: AssurancePlanAdhocComponent, data: { state: 'ap-adhoc' } },
    { path: 'assurance-plan/:assuranceId/apd/edit/:id', component: AssuranceProviderDetailComponent, data: { state: 'apd/edit' } },
    { path: 'assurance-plan/:assuranceId/apd/create', component: AssuranceProviderDetailComponent, data: { state: 'apd/create' } },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(AAProutes),
    ListCardItemModule,
    CommonModule,
    SharedComponentModule,
    IapCommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    CKEditorModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    AssurancePlanComponent,
    AssurancePlanDialogComponent,
    AssuranceTabContentComponent,
    FindingActionTabComponent,
    DetailTabComponent,
    WorkflowTrackingTabComponent,
    SearchDepartmentAapComponent,
    AssuranceTabComponent,
    EditAssessorDialogComponent,
    ChecklistDetailComponent,
    ListDeptAapComponent,
    DeptAapComponent,
    AapSummaryContentComponent,
    DepartmentSubmissionComponent,
    ResourceLoadingTabComponent,
    CalendarTabComponent,
    SubmissionSummaryTabComponent,
    SearchFilterComponent,
    ActionItemDetailComponent,
    FindingsItemDetailComponent,
    AapSummaryComponent,
    SearchFilterDialogComponent,
    ResourceLoadingCardComponent,
    ApComponent,
    // EditDepartmentAAPDialogComponent,
    ChecklistItemComponent,
    ListApComponent,
    ListAssessorComponent,
    ListChecklistItemComponent,
    DeptAapDetailComponent,
    DeptAapItemDetailComponent,
    DeptAapItemDetailContentComponent,
    CreateAapItemDialogComponent,
    ListDeptAapItemComponent,
    FindingsItemComponent,
    ListFindingsItemComponent,
    FindingsDialogComponent,
    OpuAapDetailComponent,
    ListActionItemComponent,
    ActionDialogComponent,
    AssurancePlanAdhocComponent,
    AssuranceProviderDetailComponent,
    AssurancePlanCreateComponent,
    AssurancePlanFilterComponent,
    ListProgressUpdateComponent,
    FindingsDialogComponent,
    ProgressUpdateComponent,
    ProgressUpdateDialogComponent,
    DeptAapFilterComponent,
    RequestDueDateDialogComponent,
    SearchFilterResultComponent,
    SearchDeptAapItemComponent,
    ListChecklistItemApproverViewComponent,
    ChecklistWorkflowBodyApproverViewComponent,
    ListChecklistItemFirstLineFcAssignActionPartyViewComponent,
    ListChecklistItemFirstLineFcAssignActionPartyViewHeaderComponent
  ],
  entryComponents: [
    // EditDepartmentAAPDialogComponent,
    EditAssessorDialogComponent,
    AssurancePlanDialogComponent,
    SearchFilterDialogComponent,
    FindingsDialogComponent,
    CreateAapItemDialogComponent,
    ActionDialogComponent,
    ProgressUpdateDialogComponent,
    RequestDueDateDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AnnualAssurancePlanModule { }
