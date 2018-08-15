import { Attachment } from '../../../attachment/attachment.model';

export class ActionItemProgress {
    public id?: any;
    public completionStatus: string;
    public progressUpdateDate: string;
    public completionPercentage: string;
    public remark: string;
    public actionItemId: string;
    public insertedAt: string;
    public attachmentsCount: string; 
    public attachments?: Attachment[];
    public listAttachmentId : string[];
}
