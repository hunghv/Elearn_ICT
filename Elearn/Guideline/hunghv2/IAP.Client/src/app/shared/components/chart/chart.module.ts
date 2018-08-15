import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionChartComponent } from './submission-chart/submission-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GroupVerticalBarChartComponent } from './group-vertical-bar-chart/group-vertical-bar-chart.component';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  declarations: [
    SubmissionChartComponent,
    GroupVerticalBarChartComponent
  ],
  exports: [
    SubmissionChartComponent,
    GroupVerticalBarChartComponent
  ],
})
export class ChartModule { }
