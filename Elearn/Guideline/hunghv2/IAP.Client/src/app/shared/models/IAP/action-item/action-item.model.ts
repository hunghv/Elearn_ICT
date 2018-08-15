import { Attachment } from '../../attachment/attachment.model';

export class ActionItemModel {
    public id?: any;
    public ref: string;
    public description?: string;
    public priority?: any;
    public dueDate?: Date;
    public completionStatus?: any;
    public completionDate?: string;
    public actionPartyId?: string;
    public actionVerifierId?: string;
    public attachmentsCount?: number;
    public attachments?: Attachment[];
}

export class DueDateRequestExtension {
    dueDateRequest?: Date;
    reasonForExtension?: string;
}
