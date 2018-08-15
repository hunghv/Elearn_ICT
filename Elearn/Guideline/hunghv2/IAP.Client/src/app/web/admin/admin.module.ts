import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MasterDataComponent } from './master-data/master-data.component';
import { Routes, RouterModule } from '@angular/router';
import { FeatureLayoutComponent } from '../../shared/components/common/feature-layout/feature-layout.component';
import { IapCommonModule } from '../../shared/components/common/iap-common.module';
import { MaterialModule } from '../../shared/components/common/material.module';
import { AssurancePlanFrequencyComponent } from './master-data/assurance-plan-frequency/assurance-plan-frequency.component';
import { UserRoleComponent } from './master-data/user-role/user-role.component';
import { SharedComponentModule } from '../../shared/components/shared-component.module';
import { CreateUserRoleDialogComponent } from './master-data/user-role/create-user-role-dialog/create-user-role-dialog.component';
import { AccessRightComponent } from './master-data/access-right/access-right.component';
import { AssuranceLineComponent } from './master-data/assurance-line/assurance-line.component';
import { AnnualPlanComponent } from './master-data/annual-plan/annual-plan.component';
import { CreateOpuMannualComponent } from './master-data/create-opu-mannual/create-opu-mannual.component';
import { OpuItemComponent } from './master-data/create-opu-mannual/opu-item/opu-item.component';
import { OPUDialogComponent } from './master-data/create-opu-mannual/opu-dialog/opu-dialog.component';
import { OpuManualDetailComponent } from './master-data/create-opu-mannual/opu-manual-detail/opu-manual-detail.component';
import { ListDeptAapComponent } from '../annual-assurance-plan/opu-aap-detail/list-dept-aap/list-dept-aap.component';
import { EditDepartmentAAPDialogComponent } from '../annual-assurance-plan/opu-aap-detail/list-dept-aap/add-dept-aap-dialog/add-dept-aap-dialog.component';
import { ListDeptAapManualComponent } from './master-data/create-opu-mannual/list-dept-aap-manual/list-dept-aap-manual.component';
import { DeptAapManualItemComponent } from './master-data/create-opu-mannual/list-dept-aap-manual/dept-aap-manual-item/dept-aap-manual-item.component';
import { DeptAapManualDetailComponent } from './master-data/create-opu-mannual/list-dept-aap-manual/dept-aap-manual-item/dept-aap-manual-detail/dept-aap-manual-detail.component';
import { AamSettingsComponent } from './master-data/aam-settings/aam-settings.component';
import { AddAamSettingDialogComponent } from './master-data/aam-settings/add-aam-setting-dialog/add-aam-setting-dialog.component';
import { AutoCreateDeptSettingComponent } from './master-data/auto-create-dept-setting/auto-create-dept-setting.component';
import { ChecklistDepartmentMappingComponent } from './master-data/checklist-department-mapping/checklist-department-mapping.component';
import { ChecklistDeparmentMappingDetailDialogComponent } from './master-data/checklist-department-mapping/checklist-deparment-mapping-detail-dialog/checklist-deparment-mapping-detail-dialog.component';


const routes: Routes = [
  {
    path: '',
    component: FeatureLayoutComponent,
    children: [
      { path: '', redirectTo: '/web/admin/master-data', pathMatch: 'full' },
      { path: 'master-data', component: MasterDataComponent, data: { state: 'master-data' } },
      { path: 'opu-detail/:id', component: OpuManualDetailComponent, data: { state: 'opu-detail' } },
      { path: 'dept-detail/:id', component: DeptAapManualDetailComponent, data: { state: 'dept-detail' } },
    ]
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IapCommonModule,
    MaterialModule,
    SharedComponentModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  declarations: [
    MasterDataComponent,
    AssurancePlanFrequencyComponent,
    UserRoleComponent,
    CreateUserRoleDialogComponent,
    AccessRightComponent,
    OPUDialogComponent,
    AssuranceLineComponent,
    AnnualPlanComponent,
    CreateOpuMannualComponent,
    OpuItemComponent,
    OpuManualDetailComponent,
    EditDepartmentAAPDialogComponent,
    ListDeptAapManualComponent,
    DeptAapManualItemComponent,
    DeptAapManualDetailComponent,
    AamSettingsComponent,
    AddAamSettingDialogComponent,
    AutoCreateDeptSettingComponent,
    ChecklistDepartmentMappingComponent,
    ChecklistDeparmentMappingDetailDialogComponent
  ],
  entryComponents: [
    OPUDialogComponent,
    CreateUserRoleDialogComponent,
    EditDepartmentAAPDialogComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AdminModule { }
