import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Attachment } from '../../../models/attachment/attachment.model';
import { AttachmentService } from '../../../services/attachment/attachment.service';

@Component({
  selector: 'iap-attachment-item',
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.scss']
})
export class AttachmentItemComponent implements OnInit {

  @Input() data: Attachment;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: AttachmentService
  ) { }

  ngOnInit() {
  }

  deleteAttachment() {
    this.service.deleteAttachment(this.data.id).subscribe(deletedId => {
      this.delete.emit(deletedId);
    });
  }

  downloadAttachment() {
    this.service.download(this.data.id).subscribe(data => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(data);
      link.download = this.data.fileName;
      link.click();
    });
  }
}
