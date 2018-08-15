import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Assessor } from '../../../../../shared/models/IAP/annual-assurance-plan/assessor/assessor.model';
import { AssessorService } from '../../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/assessor-service/assessor.service';
import { EditAssessorDialogComponent } from '../edit-assessor-dialog/edit-assessor-dialog.component';
import { AssurancePlan } from '../../../../../shared/models/IAP/annual-assurance-plan/assurance-plan.model';
import { HelperModule } from '../../../../../shared/helper/helper.module';
import { ActivatedRoute } from '@angular/router';
import { AssuranceProviderModel } from '../../../../../shared/models/IAP/assurance-provider/assurance-provider.model';

@Component({
  selector: 'iap-list-assessor',
  templateUrl: './list-assessor.component.html',
  styleUrls: ['./list-assessor.component.scss']
})
export class ListAssessorComponent implements OnInit {
  assessors: Assessor[] = [];
  @Input() assuranceId;
  @Input() isSecondLine;
  private assurance: AssurancePlan;
  private assuranceProvider: AssuranceProviderModel;
  private assuranceProviderId: string;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private assessorService: AssessorService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeData => {
      if (this.isSecondLine) {
        //second line
        this.assessorService.getAllAssessorByAssuranceProviderId(this.assuranceId).subscribe(
          res => {
            if (res != null) {
              this.assessors = res.items;
            }
          }
        );
      }
      else {
        //first line
        this.assessorService.getAllAssessorByAssurancePlanId(this.assuranceId).subscribe(
          res => {
            if (res != null) {
              this.assessors = res.items;
            }
          }
        );
      }

    });
  }

  onDelete(item) {
    this.assessorService.deleteById(item.id).subscribe(
      res => {
        for (var i = 0; i < this.assessors.length; i++) {
          if (this.assessors[i].id === item.id) {
            this.assessors.splice(i, 1);
            return;
          }
        }
      }
    );

  }

  openAssessorDialog() {
    const assessorRef = this.dialog.open(EditAssessorDialogComponent, {
      width: '900px',
      position: {
        top: '60px'
      },
      data: { assurancePlanId: this.assuranceId, isSecondLine: this.isSecondLine }
    });
    assessorRef
      .afterClosed()
      .subscribe(assessor => {
        if (assessor) {
          this.assessors.push(assessor);
        }
      });
  }

}
