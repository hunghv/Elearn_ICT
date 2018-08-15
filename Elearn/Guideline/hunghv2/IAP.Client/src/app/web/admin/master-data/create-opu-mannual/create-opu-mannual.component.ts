import { Component, OnInit } from '@angular/core';
import { OpuService } from '../../../../shared/services/IAP/annual-assurance-plan/opu.service';
import { OPU } from '../../../../shared/models/IAP/annual-assurance-plan/opu.model';
import { MatDialog } from '@angular/material';
import { OPUDialogComponent } from './opu-dialog/opu-dialog.component';

@Component({
  selector: 'iap-create-opu-mannual',
  templateUrl: './create-opu-mannual.component.html',
  styleUrls: ['./create-opu-mannual.component.scss']
})
export class CreateOpuMannualComponent implements OnInit {

  constructor(private opuService: OpuService,
    private dialog: MatDialog, ) { }

  lstOpu: OPU[] = [];
  ngOnInit() {
    this.opuService.getAll()
      .subscribe(res => this.lstOpu = res.items);

  }

  openOPU() {
    const opuRef = this.dialog.open(OPUDialogComponent, {
      width: '900px',
      position: {
        top: '60px'
      },
    });
    opuRef
      .afterClosed()
      .subscribe(item => {
        if (item) {
          this.lstOpu.push(item);
        }
      });
  }

}
