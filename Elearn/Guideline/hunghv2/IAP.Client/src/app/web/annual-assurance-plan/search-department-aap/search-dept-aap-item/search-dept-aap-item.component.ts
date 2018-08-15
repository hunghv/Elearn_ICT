import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DeptAAP } from '../../../../shared/models/IAP/annual-assurance-plan/departmentAAP.model';
import { DatePipe } from '@angular/common';
import { DialogHelperService } from '../../../../shared/services/dialog-helper/dialog-helper.service';
import { MessageConstant } from '../../../../shared/constants/message.constants';
import { DepartmentAapService } from '../../../../shared/services/IAP/annual-assurance-plan/department-aap/department-aap.service';

@Component({
  selector: 'iap-search-dept-aap-item',
  templateUrl: './search-dept-aap-item.component.html',
  styleUrls: ['./search-dept-aap-item.component.scss']
})
export class SearchDeptAapItemComponent implements OnInit {
  @Input() deptAAP: DeptAAP;
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();
  dateView: string;
  constructor(
    private datePipe: DatePipe,
    public dialogHelper: DialogHelperService,
    private deptAAPService: DepartmentAapService
  ) { }

  ngOnInit() {
    this.dateView = this.datePipe.transform(this.deptAAP.insertedAt, 'HH:mm, dd MMM yyyy');
  }

  onDelete() {
    this.dialogHelper.
      showConfirm(MessageConstant.MESSAGE_CONFIRM_DELETE_DEPARTMENT_AAP_ITEM).
      subscribe(confirm => {
        if (confirm) {
            this.deptAAPService.deleteById(this.deptAAP.id)
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
