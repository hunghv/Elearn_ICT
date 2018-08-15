import { Component, OnInit } from '@angular/core';
import { DeptAAP } from '../../../../../../../shared/models/IAP/annual-assurance-plan/departmentAAP.model';
import { ActivatedRoute } from '@angular/router';
import { DepartmentAapService } from '../../../../../../../shared/services/IAP/annual-assurance-plan/department-aap/department-aap.service';

@Component({
  selector: 'iap-dept-aap-manual-detail',
  templateUrl: './dept-aap-manual-detail.component.html',
  styleUrls: ['./dept-aap-manual-detail.component.scss']
})
export class DeptAapManualDetailComponent implements OnInit {
  deptAap : DeptAAP;
  isAdmin = true;
  opuId;
  
  constructor(private route: ActivatedRoute,
    private departmentAAPService: DepartmentAapService) { }

    ngOnInit() {
      this.route.paramMap.subscribe(params =>{
        let id = params.get('id')
        this.opuId = id;
        this.departmentAAPService.getById(id).subscribe(res => 
          this.deptAap = res
        );
      })
     
    }
}
