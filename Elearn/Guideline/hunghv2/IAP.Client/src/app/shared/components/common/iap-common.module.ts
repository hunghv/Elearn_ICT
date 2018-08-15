import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxComponent } from './box/box.component';
import { LabelComponent } from './label/label.component';
import { SmallCardTemplateComponent } from './small-card-template/small-card-template.component';
import { ListSmallCardTemplateComponent } from './list-small-card-template/list-small-card-template.component';
import { MaterialModule } from './material.module';
import { AttachmentComponent } from './attachment/attachment.component';
import { AttachmentItemComponent } from './attachment-item/attachment-item.component';
import { FeatureLayoutComponent } from './feature-layout/feature-layout.component';
import { RouterModule } from '@angular/router';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { BreadscrumbComponent } from './breadscrumb/breadscrumb.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListHeaderActionComponent } from './list-header-action/list-header-action.component';
import { ListHeaderRowComponent } from './list-header-row/list-header-row.component';
import { InfoLabelComponent } from './info-label/info-label.component';
import { InfoRowComponent } from './info-row/info-row.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLayoutTemplateComponent } from './form-layout-template/form-layout-template.component';
import { PaginationTemplateComponent } from './pagination-template/pagination-template.component';
import { PeoplePickerComponent } from './people-picker/people-picker.component';
import { AddressBookComponent } from './people-picker/address-book/address-book.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BoxComponent,
    LabelComponent,
    SmallCardTemplateComponent,
    ListSmallCardTemplateComponent,
    AttachmentComponent,
    AttachmentItemComponent,
    FeatureLayoutComponent,
    StarRatingComponent,
    BreadscrumbComponent,
    ListHeaderComponent,
    ListHeaderActionComponent,
    ListHeaderRowComponent,
    InfoLabelComponent,
    InfoRowComponent,
    FormLayoutTemplateComponent,
    PeoplePickerComponent,
    AddressBookComponent,
    DialogHeaderComponent,
    PaginationTemplateComponent,

  ],
  exports: [
    MaterialModule,
    BoxComponent,
    LabelComponent,
    SmallCardTemplateComponent,
    ListSmallCardTemplateComponent,
    AttachmentComponent,
    PaginationTemplateComponent,
    AttachmentItemComponent,
    FeatureLayoutComponent,
    StarRatingComponent,
    BreadscrumbComponent,
    ListHeaderComponent,
    ListHeaderActionComponent,
    ListHeaderRowComponent,
    InfoLabelComponent,
    InfoRowComponent,
    FormLayoutTemplateComponent,
    PeoplePickerComponent,
    AddressBookComponent,
    DialogHeaderComponent,
  ],
  entryComponents: [
    AddressBookComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class IapCommonModule { }
