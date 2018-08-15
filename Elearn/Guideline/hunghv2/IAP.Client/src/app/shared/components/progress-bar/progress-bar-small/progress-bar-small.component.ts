import { Component, OnInit, Input, ElementRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { ProgressBarStep } from '../../../models/progress-bar/progress-bar-step.model';
import { ProgressBar } from '../../../models/progress-bar/progress-bar.model';
import { ProgressBarStatus } from '../../../models/progress-bar/progress-bar-status.enum';
import { MatDialog } from '@angular/material';
import { ProgressDetailDialogComponent } from '../progress-detail-dialog/progress-detail-dialog.component';

@Component({
  selector: 'iap-progress-bar-small',
  templateUrl: './progress-bar-small.component.html',
  styleUrls: ['./progress-bar-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarSmallComponent implements OnInit {

  @Input() data: ProgressBar;
  @Input() selectedStep: number;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.data = {
      listStep: [
        {
          name: 'Annual Assurance Planning',
          stepIndex: 1,
          status: ProgressBarStatus.Completed,
          listStepItem: [
            {
              name: 'AAP Submission',
              status: ProgressBarStatus.Completed
            },
            {
              name: 'AAP Consolidation',
              status: ProgressBarStatus.Completed
            },
            {
              name: 'AAP Endorsement',
              status: ProgressBarStatus.Completed
            },
            {
              name: 'AAP Approval',
              status: ProgressBarStatus.Completed
            },
          ]
        },
        {
          name: 'Assurance Planning',
          stepIndex: 2,
          status: ProgressBarStatus.InProgress,
          listStepItem: [
            {
              name: 'AP Trigger',
              status: ProgressBarStatus.Completed
            },
            {
              name: 'AP Submission',
              status: ProgressBarStatus.InProgress
            },
          ]
        },
        {
          name: 'Assurance Fieldwork & Reporting',
          stepIndex: 3,
          status: ProgressBarStatus.NotStarted,
          listStepItem: []
        },
        {
          name: 'Post Assurance & Monitoring',
          stepIndex: 4,
          status: ProgressBarStatus.NotStarted,
          listStepItem: [
            {
              name: 'Action Party Assignment',
              status: ProgressBarStatus.NotStarted
            },
            {
              name: 'Action Item Execution',
              status: ProgressBarStatus.NotStarted
            },
            {
              name: 'Action Item Verification',
              status: ProgressBarStatus.NotStarted
            },
            {
              name: 'Assurance Closure',
              status: ProgressBarStatus.NotStarted
            },
          ]
        },
      ]
    };
    this.selectedStep = 2;
  }

  onSelectedStepChanged(stepIndex: number) {
    this.selectedStep = stepIndex;
  }

  openProgressDetail() {
    this.dialog.open(ProgressDetailDialogComponent, {
      width: '1000px',
      maxWidth: '80vw',
      maxHeight: '90vh',
      position: {
        top: '50px'
      }
    });
  }
}
