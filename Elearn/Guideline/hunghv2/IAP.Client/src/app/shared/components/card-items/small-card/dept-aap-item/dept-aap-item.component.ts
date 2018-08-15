import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DeptAAPItem } from '../../../../models/IAP/annual-assurance-plan/departmentAAPItem.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogHelperService } from '../../../../services/dialog-helper/dialog-helper.service';
import { MessageConstant } from '../../../../constants/message.constants';
import { DeptAAPItemService } from '../../../../services/IAP/annual-assurance-plan/department-aap-item/dept-aap-item.service';

@Component({
  selector: 'iap-dept-aap-item',
  templateUrl: './dept-aap-item.component.html',
  styleUrls: ['./dept-aap-item.component.scss']
})
export class DeptAapItemComponent implements OnInit {

  @Input() deptAapItem;
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public dialogHelper: DialogHelperService,
    private deptAAPItemService: DeptAAPItemService,
  ) { }

  ngOnInit() {
  }

  handleDeleteItem() {
    this.dialogHelper.
      showConfirm(MessageConstant.MESSAGE_CONFIRM_DELETE_AAP_ITEM).
      subscribe(confirm => {
        if (confirm) {
          this.deptAAPItemService.deleteById(this.deptAapItem.id)
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
