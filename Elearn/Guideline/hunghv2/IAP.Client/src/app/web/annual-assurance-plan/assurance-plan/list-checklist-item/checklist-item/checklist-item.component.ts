import { Component, OnInit, Input } from '@angular/core';
import { ChecklistItem } from '../../../../../shared/models/IAP/annual-assurance-plan/assurance-plan/checklist/checklist-item.model';

@Component({
  selector: 'iap-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss']
})
export class ChecklistItemComponent implements OnInit {


  @Input() checklistItem: ChecklistItem;
  constructor() { }

  ngOnInit() {
  }

}
