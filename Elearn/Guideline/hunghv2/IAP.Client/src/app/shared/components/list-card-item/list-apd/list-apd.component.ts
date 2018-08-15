import { Component, OnInit, Input } from '@angular/core';
import { AssuranceProviderModel } from '../../../models/IAP/assurance-provider/assurance-provider.model';
import { AssurancePlan } from '../../../models/IAP/annual-assurance-plan/assurance-plan.model';
import { ActivatedRoute } from '@angular/router';
import {
  AssuranceProviderService
} from '../../../services/IAP/annual-assurance-plan/assurance-plan/assurance-provider-service/assurance-provider-service';

@Component({
  selector: 'iap-list-apd',
  templateUrl: './list-apd.component.html',
  styleUrls: ['./list-apd.component.scss']
})
export class ListApdComponent implements OnInit {
  @Input() assurancePlanId: string;
  assuranceProviders: AssuranceProviderModel[];
  private assurance: AssurancePlan;
  constructor(
    private route: ActivatedRoute,
    private assuranceProviderService: AssuranceProviderService
  ) { }

  ngOnInit() {
    this.assurance = JSON.parse(localStorage.getItem('currentAssurance'));
    this.route.params.subscribe(routeData => {
      this.assuranceProviderService.getAllByAssurancePlanId(this.assurancePlanId).subscribe(
        res => {
          this.assuranceProviders = res.items;
          console.log(this.assuranceProviders);
        }
      );
    });
  }

  onDelete(item) {
    this.assuranceProviderService.deleteById(item.id).subscribe(
      res => {
        for (let i = 0; i < this.assuranceProviders.length; i++) {
          if (this.assuranceProviders[i].id === item.id) {
            this.assuranceProviders.splice(i, 1);
            return;
          }
        }
      }
    );

  }

}
