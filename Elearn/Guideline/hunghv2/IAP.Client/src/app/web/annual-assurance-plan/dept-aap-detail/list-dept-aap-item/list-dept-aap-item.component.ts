import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateAapItemDialogComponent } from '../create-aap-item-dialog/create-aap-item-dialog.component';
import { DeptAAPItem } from '../../../../shared/models/IAP/annual-assurance-plan/departmentAAPItem.model';
import { DataService } from '../../../../shared/services/data-service/data-service.service';
import { DeptAAPItemService } from '../../../../shared/services/IAP/annual-assurance-plan/department-aap-item/dept-aap-item.service';

@Component({
  selector: 'iap-list-dept-aap-item',
  templateUrl: './list-dept-aap-item.component.html',
  styleUrls: ['./list-dept-aap-item.component.scss']
})
export class ListDeptAapItemComponent implements OnInit {

  constructor(private dialog: MatDialog,
  private deptAAPItemService: DeptAAPItemService) { }
  @Input() lstDepAAPItem : DeptAAPItem[]
  @Input() deptAapId : any
  @Output() onListAAPItemChanged: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
  }

  onDelete(item) {
    this.deptAAPItemService.deleteElement(this.lstDepAAPItem, item);
    this.onListAAPItemChanged.emit(item.id);
  }

  addNewPlan() {
    const planRef = this.dialog.open(CreateAapItemDialogComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      width: '80vw',
      position: {
        top: '50px'
      },
      data: { deptAAPId: this.deptAapId }
    });
    planRef
    .afterClosed()
      .subscribe(aapItem => {
        if (aapItem) {
          this.lstDepAAPItem.push(aapItem);
          this.onListAAPItemChanged.emit(aapItem.id);
        }
      });
  }
}
