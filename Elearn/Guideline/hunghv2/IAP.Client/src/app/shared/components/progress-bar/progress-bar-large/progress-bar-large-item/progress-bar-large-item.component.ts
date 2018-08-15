import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProgressBarStepItem } from '../../../../models/progress-bar/progress-bar-step-item.model';
import { ProgressBarStatus } from '../../../../models/progress-bar/progress-bar-status.enum';
import { ChangeDetectorRef } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'iap-progress-bar-large-item',
  templateUrl: './progress-bar-large-item.component.html',
  styleUrls: ['./progress-bar-large-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarLargeItemComponent implements OnInit, AfterViewInit {

  @Input() data: ProgressBarStepItem;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cdr.detach();
  }

  isDisplayCheckSymbol(): boolean {
    return this.data.status === ProgressBarStatus.Completed;
  }

  isNotStarted(): boolean {
    return this.data.status === ProgressBarStatus.NotStarted;
  }

}
