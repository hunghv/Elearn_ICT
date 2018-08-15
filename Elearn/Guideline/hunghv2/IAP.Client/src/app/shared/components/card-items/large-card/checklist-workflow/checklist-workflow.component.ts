import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'iap-checklist-workflow',
  templateUrl: './checklist-workflow.component.html',
  styleUrls: ['./checklist-workflow.component.scss']
})
export class ChecklistWorkflowComponent implements OnInit, AfterViewInit {
@ViewChild('body', { read: ElementRef }) body: ElementRef;

  bodyElement: HTMLElement;
  bodyHeight: number;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.bodyElement = this.body.nativeElement;
    if (this.bodyElement) {
      this.bodyHeight = this.bodyElement.scrollHeight;
      this.bodyElement.style.height = `${this.bodyHeight}px`;
    }
  }

  handleExpand() {
    this.bodyElement.style.height = `${this.bodyHeight}px`;
  }

  handleCollapse() {
    this.bodyElement.style.height = `0px`;
  }

  
}
