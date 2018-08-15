import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OPU } from '../../../shared/models/IAP/annual-assurance-plan/opu.model';
import { OpuService } from '../../../shared/services/IAP/annual-assurance-plan/opu.service';

@Component({
  selector: 'iap-opu-aap-detail',
  templateUrl: './opu-aap-detail.component.html',
  styleUrls: ['./opu-aap-detail.component.scss']
})
export class OpuAapDetailComponent implements OnInit {
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
