import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCommonModule } from '../card-common/card-common.module';
import { AssurancePlanConsolidationComponent } from './assurance-plan-consolidation/assurance-plan-consolidation.component';
import { FieldworkReportingChecklistComponent } from './fieldwork-reporting-checklist/fieldwork-reporting-checklist.component';
import { CapCardComponent } from './cap-card/cap-card.component';
import { ChecklistWorkflowComponent } from './checklist-workflow/checklist-workflow.component';
import { ChecklistWorkflowHeaderComponent } from './checklist-workflow/checklist-workflow-header/checklist-workflow-header.component';
import {
  ChecklistWorkflowBodyAssignActionPartyComponent
} from './checklist-workflow/checklist-workflow-body-assign-action-party/checklist-workflow-body-assign-action-party.component';
import {
  ChecklistFindingsItemComponent
} from './checklist-workflow/checklist-workflow-body-assign-action-party/checklist-findings-item/checklist-findings-item.component';
import {
  ChecklistWorkflowBodyLeadReportViewComponent
} from './checklist-workflow/checklist-workflow-body-lead-report-view/checklist-workflow-body-lead-report-view.component';
import {
  ChecklistFindingsViewItemComponent
} from './checklist-workflow/checklist-workflow-body-lead-report-view/checklist-findings-view-item/checklist-findings-view-item.component';
import {
  ChecklistWorkflowBodyCapComponent
} from './checklist-workflow/checklist-workflow-body-cap/checklist-workflow-body-cap.component';
import {
  ChecklistCapFindingsItemComponent
} from './checklist-workflow/checklist-workflow-body-cap/checklist-cap-findings-item/checklist-cap-findings-item.component';
import {
  ChecklistCapActionItemComponent
} from './checklist-workflow/checklist-workflow-body-cap/checklist-cap-findings-item/checklist-cap-action-item/checklist-cap-action-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CardCommonModule,
    RouterModule
  ],
  declarations: [
    AssurancePlanConsolidationComponent,
    FieldworkReportingChecklistComponent,
    CapCardComponent,
    ChecklistWorkflowComponent,
    ChecklistWorkflowHeaderComponent,
    ChecklistWorkflowBodyAssignActionPartyComponent,
    ChecklistFindingsItemComponent,
    ChecklistWorkflowBodyLeadReportViewComponent,
    ChecklistFindingsViewItemComponent,
    ChecklistWorkflowBodyCapComponent,
    ChecklistCapFindingsItemComponent,
    ChecklistCapActionItemComponent
  ],
  exports: [
    AssurancePlanConsolidationComponent,
    FieldworkReportingChecklistComponent,
    CapCardComponent,
    ChecklistWorkflowComponent,
    ChecklistWorkflowHeaderComponent,
    ChecklistWorkflowBodyAssignActionPartyComponent,
    ChecklistFindingsItemComponent,
    ChecklistWorkflowBodyLeadReportViewComponent,
    ChecklistFindingsViewItemComponent,
    ChecklistWorkflowBodyCapComponent
  ]
})
export class LargeCardModule { }
