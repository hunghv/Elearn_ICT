import { Component, OnInit, Input } from '@angular/core';
import { BreadscrumbItem } from '../../../models/breadscrumb/breadscrumb-item.model';
import { BreadscrumbResolver } from '../../../services/breadscrumb-resolver/breadscrumb-resolver.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'iap-breadscrumb',
  templateUrl: './breadscrumb.component.html',
  styleUrls: ['./breadscrumb.component.scss']
})
export class BreadscrumbComponent implements OnInit {

  data: BreadscrumbItem[];

  constructor(private breadscrumResolver: BreadscrumbResolver,
    private router: Router
  ) { }

  ngOnInit() {
    const url = this.router.url;
    switch (url) {
      case '/web/annual-assurance-plan/opu-aap': {
        this.data = this.breadscrumResolver.generateOPUAAP();
        break;
      }
      case '/web/annual-assurance-plan/assurance-plan': {
        this.data = this.breadscrumResolver.generateAP();
        break;
      }
      case '/web/annual-assurance-plan/dept-aap-detail': {
        this.data = this.breadscrumResolver.generateDeptAAP();
        break;
      }
      case '/web/annual-assurance-plan/dept-aap-item-detail': {
        this.data = this.breadscrumResolver.generateDeptAAPItem();
        break;
      }
      case '/web/annual-assurance-plan/assurance-plan/checklist-detail': {
        this.data = this.breadscrumResolver.generateChecklist();
        break;
      }
      case '/web/annual-assurance-plan/assurance-plan/findings-item-detail': {
        this.data = this.breadscrumResolver.generateFindings();
        break;
      }
      case '/web/annual-assurance-plan/assurance-plan/action-item-detail': {
        this.data = this.breadscrumResolver.generateActionItem();
        break;
      }
      default: break;
    }
  }

}
