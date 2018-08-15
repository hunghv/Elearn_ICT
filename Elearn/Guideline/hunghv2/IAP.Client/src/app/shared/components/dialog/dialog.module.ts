import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemarkDialogComponent } from './remark-dialog/remark-dialog.component';
import { IapCommonModule } from '../common/iap-common.module';
import { RemarkQuestionComponent } from './remark-dialog/remark-question/remark-question.component';
import { CardCommonModule } from '../card-items/card-common/card-common.module';

@NgModule({
  imports: [
    CommonModule,
    IapCommonModule,
    CardCommonModule
  ],
  declarations: [
    RemarkDialogComponent,
    RemarkQuestionComponent,
  ],
  exports: [
  ],
  entryComponents: [
    RemarkDialogComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DialogModule { }
