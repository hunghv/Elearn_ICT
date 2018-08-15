import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCommonModule } from '../card-common/card-common.module';
import { ActionItemComponent } from './action-item/action-item.component';
import { OpuAapComponent } from './opu-aap/opu-aap.component';
import { SubmissionSummaryComponent } from './submission-summary/submission-summary.component';
import { ChartModule } from '../../chart/chart.module';
import {
  AssessorComponent
} from '../../../../web/annual-assurance-plan/assurance-plan/accessors/list-assessor/assessor/assessor.component';
import { DeptAapItemComponent } from './dept-aap-item/dept-aap-item.component';
import { ApdComponent } from './apd/apd.component';

@NgModule({
  imports: [
    CommonModule,
    CardCommonModule,
    ChartModule
  ],
  declarations: [
    ActionItemComponent,
    AssessorComponent,
    OpuAapComponent,
    SubmissionSummaryComponent,
    DeptAapItemComponent,
    ApdComponent,
  ],
  exports: [
    CardCommonModule,
    ActionItemComponent,
    AssessorComponent,
    OpuAapComponent,
    SubmissionSummaryComponent,
    DeptAapItemComponent,
    ApdComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmallCardModule { }
