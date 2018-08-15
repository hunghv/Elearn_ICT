import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'iap-search-filter-dialog',
  templateUrl: './search-filter-dialog.component.html',
  styleUrls: ['./search-filter-dialog.component.scss']
})
export class SearchFilterDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SearchFilterDialogComponent>) { }

  ngOnInit() {
  }

  handleFilterApply(filter: any) {
    this.dialogRef.close(filter);
  }
}
