import { Component, OnInit } from '@angular/core';
import { AddAamSettingDialogComponent } from './add-aam-setting-dialog/add-aam-setting-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'iap-aam-settings',
  templateUrl: './aam-settings.component.html',
  styleUrls: ['./aam-settings.component.scss']
})
export class AamSettingsComponent implements OnInit {

  constructor(
    private dialog : MatDialog
  ) { }

  ngOnInit() {
  }

  openDialog() {
    const aamSettingRef = this.dialog.open(AddAamSettingDialogComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      width: '80vw',
      position: {
        top: '50px'
      },
    });
    aamSettingRef
      .afterClosed()
      .subscribe(ap => {
        if (ap) {
          // this.listAItemProgress.push(ap);
        }
      });
  }
}
