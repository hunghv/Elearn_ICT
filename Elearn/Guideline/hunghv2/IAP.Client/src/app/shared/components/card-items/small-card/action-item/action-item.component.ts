import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActionItemModel } from '../../../../models/IAP/action-item/action-item.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogHelperService } from '../../../../services/dialog-helper/dialog-helper.service';
import { ActionItemService } from '../../../../services/IAP/action-item/action-item.service';
import { MessageConstant } from '../../../../constants/message.constants';

@Component({
  selector: 'iap-action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.scss']
})
export class ActionItemComponent implements OnInit {

  @Input() data: ActionItemModel;
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public dialogHelper: DialogHelperService,
    private actionItemService: ActionItemService
  ) { }

  ngOnInit() {
  }

  handleDeleteItem() {
    this.dialogHelper.
      showConfirm(MessageConstant.MESSAGE_CONFIRM_DELETE_ACTION_ITEM).
      subscribe(confirm => {
        if (confirm) {
          this.actionItemService.deleteById(this.data.id)
            .subscribe(data => {
              if (data) {
                this.dialogHelper.showSuccess(MessageConstant.MESSAGE_DELETE_SUCCESS);
                this.onDeleteClick.emit(data.id);
              }
            });
        }
      });
  }
}
