import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'iap-assurance-tab',
  templateUrl: './assurance-tab.component.html',
  styleUrls: ['./assurance-tab.component.scss']
})
export class AssuranceTabComponent implements OnInit {
  @Input() isSubmitter;
  @Output()

  selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }
  onTabChange(e) {
    this.selectedIndexChange.emit(e.index);
  }

}
