import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActionDialogComponent } from './action-dialog/action-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { DialogHelperService } from '../../../../../shared/services/dialog-helper/dialog-helper.service';
import { MessageConstant } from '../../../../../shared/constants/message.constants';
import { ActionItemModel } from '../../../../../shared/models/IAP/action-item/action-item.model';
import { ActionItemService } from '../../../../../shared/services/IAP/action-item/action-item.service';

@Component({
  selector: 'iap-list-action-item',
  templateUrl: './list-action-item.component.html',
  styleUrls: ['./list-action-item.component.scss']
})
export class ListActionItemComponent implements OnInit {

  findingsId: any;
  actionItems: ActionItemModel[] = [];

  constructor(private dialog: MatDialog,
    private route: ActivatedRoute,
    private dialogHelper: DialogHelperService,
    private service: ActionItemService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.findingsId = params.id;
      this.getListActionItem(this.findingsId);
    });
  }

  openActionDialog() {
    const action = this.dialog.open(ActionDialogComponent, {
      width: '1000px',
      maxWidth: '80vw',
      maxHeight: '90vh',
      position: {
        top: '50px'
      },
      data: { findingsId: this.findingsId }
    });
    action.afterClosed().subscribe(data => {
      if (data) {
        if (data.result) {
          this.dialogHelper.showSuccess(MessageConstant.MESSAGE_SAVE_SUCCESSFULLY);
          this.getListActionItem(this.findingsId);
        } else {
          this.dialogHelper.showError(MessageConstant.MESSAGE_SAVE_FAIL);
        }
      }
    });
  }

  getListActionItem(findingsId) {
    if (findingsId) {
      this.service.getListActionItemByFindings(this.findingsId).subscribe((data) => {
        if (data && data.items) {
          this.actionItems = data.items;
        }
      });
    }
  }

  onDelete(item) {
    this.service.deleteElement(this.actionItems, item);
  }
}
