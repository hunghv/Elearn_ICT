import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProgressUpdateDialogComponent } from './progress-update-dialog/progress-update-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ActionItemProgressService } from '../../../../../shared/services/IAP/action-item/update-progress.service/update-progress.service';
import { ActionItemProgress } from '../../../../../shared/models/IAP/action-item/action-item-progress/action-item-progress.model';

@Component({
  selector: 'iap-list-progress-update',
  templateUrl: './list-progress-update.component.html',
  styleUrls: ['./list-progress-update.component.scss']
})
export class ListProgressUpdateComponent implements OnInit, OnChanges {

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private apService: ActionItemProgressService
  ) { }

  @Input() parentId: any;
  listAItemProgress: ActionItemProgress[] = [];

  ngOnInit() {
    if (this.parentId) {
      this.apService.getListActionItemProgressByActionItemId(this.parentId).subscribe(res => 
       {
        this.listAItemProgress = res.items;
       }
      );
    }
  }

  ngOnChanges(): void {
    
  }

  openDialog() {
    const progressUpdateRef = this.dialog.open(ProgressUpdateDialogComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      width: '80vw',
      position: {
        top: '50px'
      },
      data: { parentId: this.parentId }
    });
    progressUpdateRef
      .afterClosed()
      .subscribe(ap => {
        if (ap) {
          this.listAItemProgress.push(ap);
        }
      });
  }

  onDelete(item) {
    this.apService.deleteElement(this.listAItemProgress, item);
  }
}
