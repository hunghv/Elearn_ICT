import { Component, OnInit, Input, ViewChild, EventEmitter, Output, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Attachment } from '../../../models/attachment/attachment.model';
import { ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AttachmentService } from '../../../services/attachment/attachment.service';
import { MessageConstant } from '../../../constants/message.constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonConstants } from '../../../constants/common.constants';

@Component({
  selector: 'iap-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit, OnChanges {
  @ViewChild('file', { read: ElementRef }) browseBtn: ElementRef;
  @Input() listAttachmentId: any[];
  @Input() disabledUpload = false;
  @Input() listAttachmentTitle: string;
  @Output() beforeUpload: EventEmitter<any> = new EventEmitter();
  @Output() afterUpload: EventEmitter<any> = new EventEmitter();
  @Output() afterDelete: EventEmitter<any> = new EventEmitter();
  attachmentType = 'document';

  listAttachment: Attachment[] = [];
  message = MessageConstant;
  documentForm: FormGroup;
  linkForm: FormGroup;
  documentType: FormControl;
  documentName: FormControl;
  linkUrl: FormControl;
  linkName: FormControl;
  linkType: FormControl;

  constructor(
    private datePipe: DatePipe,
    private service: AttachmentService
  ) { }

  ngOnChanges() {
    if (this.listAttachmentId && this.listAttachmentId.length > 0) {
      this.service.getListAttachment(this.listAttachmentId).subscribe((data: any) => {
        this.listAttachment = data.items;
      });
    } else {
      this.listAttachment = [];
    }
  }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  openFileDialog() {
    this.resetValidatorUploadFile();
    if (this.documentName.invalid || this.documentType.invalid) {
      return;
    }
    if (this.browseBtn && this.browseBtn.nativeElement) {
      this.browseBtn.nativeElement.click();
    }
  }

  handleInputFileChange(event) {
    const src = <HTMLInputElement>event.srcElement;
    if (!src || !src.value) {
      return;
    }
    const files = src.files;
    if (!files) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('uploadedFile', files[0]);
    formData.append('documentName', this.documentName.value);
    formData.append('documentType', this.documentType.value);
    this.beforeUpload.emit(formData);
    this.service.uploadAttachment(formData).subscribe(data => {
      this.afterUpload.emit(data);
      src.value = '';
      this.clearDocumentForm();
    });
  }
  
  saveLink() {
    this.resetValidatorUplink();
    if (this.linkName.invalid ||
      this.linkType.invalid ||
      this.linkUrl.invalid
    ) {
      return;
    }

    const postData = {
      documentName: this.linkName.value,
      documentType: this.linkType.value,
      url: this.linkUrl.value,
    };
    this.beforeUpload.emit(postData);

    this.service.uploadLink(postData).
      subscribe(data => {
        this.afterUpload.emit(data);
        this.clearLinkForm();
      });
  }

  clearDocumentForm() {
    this.documentType.clearValidators();
    this.documentName.clearValidators();
    this.documentForm.reset();
  }

  clearLinkForm() {
    this.linkForm.reset();
    this.linkName.clearValidators();
    this.linkType.clearValidators();
    this.linkUrl.clearValidators();
  }

  resetValidatorUploadFile() {
    this.documentType.setValidators(Validators.required);
    this.documentName.setValidators(Validators.required);
    this.documentType.updateValueAndValidity();
    this.documentName.updateValueAndValidity();
    this.documentName.markAsDirty();
    this.documentType.markAsDirty();
  }

  resetValidatorUplink() {
    this.linkName.setValidators(Validators.required);
    this.linkType.setValidators(Validators.required);
    this.linkUrl.setValidators([
      Validators.required,
      Validators.pattern(CommonConstants.URL_PATTERN)
    ]);
    this.linkName.updateValueAndValidity();
    this.linkType.updateValueAndValidity();
    this.linkUrl.updateValueAndValidity();
    this.linkName.markAsDirty();
    this.linkType.markAsDirty();
    this.linkUrl.markAsDirty();
  }



  createFormControl() {
    this.documentName = new FormControl('', Validators.required);
    this.documentType = new FormControl('', Validators.required);
    this.linkName = new FormControl('', Validators.required);
    this.linkType = new FormControl('', Validators.required);
    this.linkUrl = new FormControl('',
      [
        Validators.required,
        Validators.pattern(CommonConstants.URL_PATTERN)
      ]);
  }

  createForm() {
    this.documentForm = new FormGroup({
      documentName: this.documentName,
      documentType: this.documentType,
    });
    this.linkForm = new FormGroup({
      linkName: this.linkName,
      linkType: this.linkType,
      linkUrl: this.linkUrl
    });
  }

  handleDeleteAttachment(deletedId) {
    this.afterDelete.emit(deletedId);
  }
}
