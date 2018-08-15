import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'iap-add-aam-setting-dialog',
  templateUrl: './add-aam-setting-dialog.component.html',
  styleUrls: ['./add-aam-setting-dialog.component.scss']
})
export class AddAamSettingDialogComponent implements OnInit {
  form;
  lstOpu: any[];
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
    this.getListOpu();
  }
  createForm() {
    this.form = this.fb.group({
      year: '',
      opuId: '',
      isActive: '',
    });

  }
  getListOpu() {
    //get opu list
  }
  onSubmit(){
    
  }
}
