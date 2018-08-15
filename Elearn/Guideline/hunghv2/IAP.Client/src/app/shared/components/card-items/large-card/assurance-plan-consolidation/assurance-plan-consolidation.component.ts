import { Component, OnInit } from '@angular/core';
import { DialogHelperService } from '../../../../services/dialog-helper/dialog-helper.service';

@Component({
  selector: 'iap-assurance-plan-consolidation',
  templateUrl: './assurance-plan-consolidation.component.html',
  styleUrls: ['./assurance-plan-consolidation.component.scss']
})
export class AssurancePlanConsolidationComponent implements OnInit {

  color = '#58478D';
  leadAssessor = 'Khang Luong';
  teamLead;

  constructor(private dialogService: DialogHelperService) { }

  ngOnInit() {
  }
  openDialog(type: number, title: string) {
    const dialogResult = this.dialogService.showConfirm('Are you sure you want to endorse this?', title);
    dialogResult.subscribe(result => {
      if (result) {
        console.log('Yes!!!');
      }
    });
  }
  getColor() {
    return this.color;
  }
}
