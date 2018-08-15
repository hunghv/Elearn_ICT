import { Component, OnInit, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { ProgressBar } from '../../../models/progress-bar/progress-bar.model';
import { ProgressBarStatus } from '../../../models/progress-bar/progress-bar-status.enum';
import { AfterViewInit, AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { NgZone } from '@angular/core';
import { ProgressBarLargeStepComponent } from './progress-bar-large-step/progress-bar-large-step.component';

@Component({
  selector: 'iap-progress-bar-large',
  templateUrl: './progress-bar-large.component.html',
  styleUrls: ['./progress-bar-large.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarLargeComponent implements OnInit {

  @Input() data: ProgressBar;
  @Input() selectedStep: number;


  constructor() { }

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
}
