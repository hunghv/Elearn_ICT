import { Component, OnInit, Input } from '@angular/core';
import { ChecklistItem } from '../../../../shared/models/IAP/annual-assurance-plan/assurance-plan/checklist/checklist-item.model';

@Component({
  selector: 'iap-list-checklist-item',
  templateUrl: './list-checklist-item.component.html',
  styleUrls: ['./list-checklist-item.component.scss']
})
export class ListChecklistItemComponent implements OnInit {


  @Input() checklistItems: ChecklistItem[];
  constructor() { }

  ngOnInit() {
  }

}
