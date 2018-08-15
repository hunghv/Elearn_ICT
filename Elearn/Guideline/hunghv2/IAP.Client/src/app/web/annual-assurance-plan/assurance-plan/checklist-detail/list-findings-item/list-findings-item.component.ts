import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FindingsDialogComponent } from './findings-dialog/findings-dialog.component';
import { FindingService } from '../../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/checklist-service/finding-service/finding.service';
import { Finding } from '../../../../../shared/models/IAP/annual-assurance-plan/assurance-plan/checklist/finding/finding.model';

import { ActivatedRoute } from '@angular/router';
import { ParentFindingType } from '../../../../../shared/constants/common.constants';

@Component({
  selector: 'iap-list-findings-item',
  templateUrl: './list-findings-item.component.html',
  styleUrls: ['./list-findings-item.component.scss']
})
export class ListFindingsItemComponent implements OnInit, OnChanges {

  ngOnChanges(): void {
    if(this.parentId)
    {
      this.apService.getfindingByParentIdId(this.parentId).subscribe(res => this.findings = res.items);
    }
  }
  @Input() parentFindingType: string;

  @Input() parentId: any;
  constructor(
    private apService: FindingService,
    private dialog: MatDialog,
    private route: ActivatedRoute) {

  }
  findings: Finding[] = [];
  id;
  color = 'red';
  ngOnInit() {
  }

  onDelete(item) {
    this.apService.deleteElement(this.findings, item);
  }

  openFindingDialog() {
    debugger;
    const findingsDialog = this.dialog.open(FindingsDialogComponent, {
      width: '900px',
      position: {
        top: '60px'
      },
      data: { parentId: this.parentId, parentFindingType: this.parentFindingType }
    });
      findingsDialog
        .afterClosed()
        .subscribe(ap => {
          if (ap) {
            this.findings.push(ap);
          }
        });
  }
}
