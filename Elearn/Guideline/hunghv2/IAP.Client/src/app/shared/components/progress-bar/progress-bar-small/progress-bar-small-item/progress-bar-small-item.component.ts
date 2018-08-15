import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProgressBarStepItem } from '../../../../models/progress-bar/progress-bar-step-item.model';
import { ProgressBarStatus } from '../../../../models/progress-bar/progress-bar-status.enum';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'iap-progress-bar-small-item',
  templateUrl: './progress-bar-small-item.component.html',
  styleUrls: ['./progress-bar-small-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarSmallItemComponent implements OnInit, AfterViewInit {

  @Input() data: ProgressBarStepItem;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.cd.detach();
  }

  isDisplayCheckSymbol(): boolean {
    return this.data.status === ProgressBarStatus.Completed;
  }

  isNotStarted(): boolean {
    return this.data.status === ProgressBarStatus.NotStarted;
  }
}
