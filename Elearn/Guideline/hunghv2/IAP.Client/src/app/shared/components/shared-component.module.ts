import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../directives/directives.module';
import { CardItemModule } from './card-items/card-item.module';
import { ListCardItemModule } from './list-card-item/list-card-item.module';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { DialogModule } from './dialog/dialog.module';
import { ChartModule } from './chart/chart.module';
import { ProgressBarModule } from './progress-bar/progress-bar.module';
import { IapCommonModule } from './common/iap-common.module';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    CardItemModule,
    ListCardItemModule,
    DialogModule,
    ChartModule,
    ProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    IapCommonModule
  ],
  declarations: [
    NotificationDialogComponent,
    PageHeaderComponent,
  ],

  entryComponents: [
    NotificationDialogComponent,
  ],

  exports: [
    NotificationDialogComponent,
    PageHeaderComponent,
    CardItemModule,
    ListCardItemModule,
    DialogModule,
    ChartModule,
    ProgressBarModule,
    IapCommonModule
  ],
})
export class SharedComponentModule { }
