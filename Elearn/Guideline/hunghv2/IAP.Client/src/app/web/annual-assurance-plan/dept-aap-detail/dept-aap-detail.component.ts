import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateAapItemDialogComponent } from './create-aap-item-dialog/create-aap-item-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { DepartmentAapService } from '../../../shared/services/IAP/annual-assurance-plan/department-aap/department-aap.service';
import { OPU } from '../../../shared/models/IAP/annual-assurance-plan/opu.model';
import { DeptAAP } from '../../../shared/models/IAP/annual-assurance-plan/departmentAAP.model';
import { BrowserLocationService } from '../../../shared/services/browser-location/browser-location.service';

@Component({
  selector: 'iap-dept-aap-detail',
  templateUrl: './dept-aap-detail.component.html',
  styleUrls: ['./dept-aap-detail.component.scss']
})
export class DeptAapDetailComponent implements OnInit {

  deptAap: DeptAAP;
  isAdmin = true;
  opuId;
  numberAapItemcompleted = 0

  constructor(
    private route: ActivatedRoute,
    private departmentAAPService: DepartmentAapService,
    public location: BrowserLocationService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id')
      this.opuId = id;
      this.departmentAAPService.getById(id).subscribe(res =>
        {
          this.deptAap = res
          this.calculateNumberAAPItemCompleted()
        }
      );
    })

  }

  onListAAPItemChanged(item){
    this.calculateNumberAAPItemCompleted()
  }

  calculateNumberAAPItemCompleted(){
    this.numberAapItemcompleted = 0;
    this.deptAap.deptAAPItems.forEach(item =>{
      if(item.status == 'Draft') this.numberAapItemcompleted++
    })
  }
}
