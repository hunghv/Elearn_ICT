import { Component, OnInit, Input, Output, ViewChild, EventEmitter, } from '@angular/core';
import { FindingService } from '../../../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/checklist-service/finding-service/finding.service';
import { FindingsDialogComponent } from '../findings-dialog/findings-dialog.component';
import { Finding } from '../../../../../../shared/models/IAP/annual-assurance-plan/assurance-plan/checklist/finding/finding.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogHelperService } from '../../../../../../shared/services/dialog-helper/dialog-helper.service';
import { MessageConstant } from '../../../../../../shared/constants/message.constants';

@Component({
  selector: 'iap-findings-item',
  templateUrl: './findings-item.component.html',
  styleUrls: ['./findings-item.component.scss']
})
export class FindingsItemComponent implements OnInit {
  @Input() finding: Finding;
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();

  constructor(private findingService: FindingService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public dialogHelper: DialogHelperService) {
  }

  ngOnInit() {

  }

  edit() {
    const findingRef = this.dialog.open(FindingsDialogComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      position: {
        top: '50px'
      },
      data: { finding: this.finding, isEdit: true}

    });
    findingRef.afterClosed().subscribe(data => {
      this.findingService = data;
    });
  } 
  onDelete() {
    this.dialogHelper.
      showConfirm(MessageConstant.MESSAGE_CONFIRM_DELETE_FINDING_ITEM).
      subscribe(confirm => {
        if (confirm) {
            this.findingService.deleteById(this.finding.id)
            .subscribe(data => {
              if (data) {
                this.dialogHelper.showSuccess(MessageConstant.MESSAGE_DELETE_SUCCESS);
                this.onDeleteClick.emit(data.id);
              }
            });
        }
      });
    // this.onDeleteClick.emit();
   
  }


}
