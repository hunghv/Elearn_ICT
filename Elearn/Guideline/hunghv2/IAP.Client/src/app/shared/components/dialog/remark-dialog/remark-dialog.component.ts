import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { PageEvent } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { RemarkQuestionModel } from './remark-question/remark-question.model';
import { MasterDataService } from '../../../services/IAP/master-data/masterdata.service';
import { UserRatingMappingService } from '../../../services/IAP/annual-assurance-plan/assurance-plan/user-rating-mapping.service';
import { DialogHelperService } from '../../../services/dialog-helper/dialog-helper.service';
import { AppError } from '../../../services/data-service/app-error';
import { NotFoundError } from '../../../services/data-service/not-found-error';
import { UserRatingMappingModel } from './remark-question.model';
import { GuidHelper } from '../../../helper/guid-helper/guid-helper';
import { HelperModule } from '../../../helper/helper.module';

@Component({
  selector: 'iap-remark-dialog',
  templateUrl: './remark-dialog.component.html',
  styleUrls: ['./remark-dialog.component.scss']
})
export class RemarkDialogComponent implements OnInit {

  remarkQuestions: RemarkQuestionModel[] = [];
  listUserRatingMappings: UserRatingMappingModel[] = [];
  private assuranceId: string;
  private leadAccessorId: string;
  private isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<RemarkDialogComponent>,
    private masterDataService: MasterDataService,
    private userRatingMappingService: UserRatingMappingService,
    private dialogHelper: DialogHelperService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.assuranceId = data.assuranceId;
    this.leadAccessorId = data.leadAccessorId;
  }

  ngOnInit() {
    this.masterDataService.getMasterDataByRoute("GetAllQuestionRating")
      .subscribe(remarkQuestions => {

        this.userRatingMappingService.getList(this.assuranceId, this.leadAccessorId)
          .subscribe(resUserRatingMapping => {
            this.isEditMode = resUserRatingMapping.items.length > 0;
            if (this.isEditMode) this.listUserRatingMappings = resUserRatingMapping.items;

            for (var i = 0; i < remarkQuestions.length; i++) {
              remarkQuestions[i].number = i + 1;
              remarkQuestions[i].rate = null;

              if (this.isEditMode) {
                let userRatingItem = resUserRatingMapping.items.filter(item => {
                  return item.mdQuestionRatingId == remarkQuestions[i].id;
                });

                remarkQuestions[i].rate = userRatingItem[0].value;
              }
            }

            this.remarkQuestions = remarkQuestions;
          });

      });
  }


  handleRate(remarkQuestion: RemarkQuestionModel) {
    //update remark question
    for (var i = 0; i < this.remarkQuestions.length; i++) {
      if (this.remarkQuestions[i].id == remarkQuestion.id) {
        this.remarkQuestions[i].rate = remarkQuestion.rate;
        break;
      }
    }

    //update user rating mapping
    if (this.isEditMode) {
      for (var i = 0; i < this.listUserRatingMappings.length; i++) {
        if (this.listUserRatingMappings[i].mdQuestionRatingId == remarkQuestion.id) {
          this.listUserRatingMappings[i].value = remarkQuestion.rate;
          break;
        }
      }
    }
  }

  onSave() {
    if (this.isEditMode) {
      //edit
      this.userRatingMappingService.updateList(this.listUserRatingMappings)
        .subscribe(res => {
          this.dialogHelper.showSuccess('Save successfully!');
        },
          (error: AppError) => {
            // handle expected error;
            if (error instanceof NotFoundError) {
              this.dialogHelper.showError('Save unsuccessfully!');
            } else {
              // or just log error message from server
              this.dialogHelper.showError(error.originalError.exceptionMessage);
            }
          });
    }
    else {
      //create
      for (var i = 0; i < this.remarkQuestions.length; i++) {
        var obj = new UserRatingMappingModel();
        obj.id = HelperModule.newGuid();
        obj.assurancePlanId = this.assuranceId;
        obj.mdUserProfileId = this.leadAccessorId;
        obj.mdQuestionRatingId = this.remarkQuestions[i].id;
        obj.value = this.remarkQuestions[i].rate;

        this.listUserRatingMappings.push(obj);
      }

      this.userRatingMappingService.createList(this.listUserRatingMappings)
        .subscribe(res => {
          this.dialogHelper.showSuccess('Save successfully!');
        },
          (error: AppError) => {
            // handle expected error;
            if (error instanceof NotFoundError) {
              this.dialogHelper.showError('Save unsuccessfully!');
            } else {
              // or just log error message from server
              this.dialogHelper.showError(error.originalError.exceptionMessage);
            }
          });
    }

  }

}