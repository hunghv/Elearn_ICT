import { Component, OnInit, Input, Output, EventEmitter, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ProgressBarStep } from '../../../../models/progress-bar/progress-bar-step.model';
import { ProgressBarStatus } from '../../../../models/progress-bar/progress-bar-status.enum';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'iap-progress-bar-large-step',
  templateUrl: './progress-bar-large-step.component.html',
  styleUrls: ['./progress-bar-large-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarLargeStepComponent implements OnInit, AfterViewInit {


  @Input() data: ProgressBarStep;
  @Output() selectedStepChange = new EventEmitter<number>();
  @HostBinding('class.not-started') isNotStarted: boolean;

  isStepCompleted: boolean;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.setClassForProgressStep();
    this.checkStepCompleted();
  }

  ngAfterViewInit(): void {
    this.cdr.detach();
  }

  setClassForProgressStep() {
    this.isNotStarted = this.data.status === ProgressBarStatus.NotStarted;
  }

  checkStepCompleted() {
    this.isStepCompleted = this.data.status === ProgressBarStatus.Completed;
  }

  toggleBar() {
    this.selectedStepChange.emit(this.data.stepIndex);
  }
}
