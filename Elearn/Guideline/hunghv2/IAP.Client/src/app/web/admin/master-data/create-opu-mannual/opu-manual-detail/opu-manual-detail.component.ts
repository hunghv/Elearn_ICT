import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpuService } from '../../../../../shared/services/IAP/annual-assurance-plan/opu.service';
import { OPU } from '../../../../../shared/models/IAP/annual-assurance-plan/opu.model';

@Component({
  selector: 'iap-opu-manual-detail',
  templateUrl: './opu-manual-detail.component.html',
  styleUrls: ['./opu-manual-detail.component.scss']
})
export class OpuManualDetailComponent implements OnInit {
  opu: OPU;
  isAdmin = true;
  opuId;
  constructor(private route: ActivatedRoute,
    private opuService: OpuService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.opuService.getById(id).subscribe(res =>
        this.opu = res
      );
    });
  }

}
