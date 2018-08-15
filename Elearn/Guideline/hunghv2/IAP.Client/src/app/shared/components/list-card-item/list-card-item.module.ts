import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOpuAapComponent } from './list-opu-aap/list-opu-aap.component';
import { CardItemModule } from '../card-items/card-item.module';
import { ListAssurancePlanConsolidationComponent } from './list-assurance-plan-consolidation/list-assurance-plan-consolidation.component';


import { SmallCardModule } from '../card-items/small-card/small-card.module';
import {
  ListFieldworkReportingChecklistComponent
} from './list-fieldwork-reporting-checklist/list-fieldwork-reporting-checklist.component';
import { RouterModule } from '@angular/router';
import { IapCommonModule } from '../common/iap-common.module';
import { DialogModule } from '../dialog/dialog.module';
import { FormsModule } from '@angular/forms';
import { ListApdComponent } from './list-apd/list-apd.component';

@NgModule({
  imports: [
    CommonModule,
    CardItemModule,
    RouterModule,
    IapCommonModule,
    DialogModule,
    FormsModule
  ],
  declarations: [
    ListOpuAapComponent,
    ListAssurancePlanConsolidationComponent,
    ListFieldworkReportingChecklistComponent,
    ListApdComponent,
  ],
  exports: [
    ListOpuAapComponent,
    ListAssurancePlanConsolidationComponent,
    ListFieldworkReportingChecklistComponent,
    ListApdComponent,
  ],
  entryComponents: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListCardItemModule { }
