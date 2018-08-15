import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app-config/app-config.service';
import { UrlConstants } from '../../constants/url.constants';

@Injectable()
export class AttachmentService {

  constructor(private http: HttpClient) { }

  uploadAttachment(formData: FormData) {
    return this.http.post(
      APP_CONFIG.apiServer + UrlConstants.ATTACHMENT + `/uploadDocument`,
      formData);
  }

  uploadLink(formData: any) {
    return this.http.post(
      APP_CONFIG.apiServer + UrlConstants.ATTACHMENT + `/uploadLink`,
      formData);
  }

  getListAttachment(listAttachmentId: any[]) {
    return this.http.get(
      APP_CONFIG.apiServer + UrlConstants.ATTACHMENT + `/getListAttachment`,
      { params: { listAttachmentId: listAttachmentId } });
  }

  deleteAttachment(attachmentId: any) {
    return this.http.delete(
      APP_CONFIG.apiServer + UrlConstants.ATTACHMENT + `/${attachmentId}`
    );
  }

  download(attachmentId: any) {
    return this.http.get(
      APP_CONFIG.apiServer + UrlConstants.ATTACHMENT + `/download/${attachmentId}`,
      { responseType: 'blob' }
    );
  }
}
