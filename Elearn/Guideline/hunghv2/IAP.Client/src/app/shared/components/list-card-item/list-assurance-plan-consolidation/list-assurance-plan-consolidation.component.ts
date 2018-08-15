import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'iap-list-assurance-plan-consolidation',
  templateUrl: './list-assurance-plan-consolidation.component.html',
  styleUrls: ['./list-assurance-plan-consolidation.component.scss']
})
export class ListAssurancePlanConsolidationComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
}
