
export class Finding {
  constructor(
    public id: string,
    public description: string,
    public findingType: string,
    public classification: string,
    public status: string,
    public findingNo: string,
    public actionItemNumber: number,
    public checklistType: any,
    public findingDetails: string,
    public recommendation: string,
    public shareToOtherLocation: string,
    public capReviewer: string,
    public capApprover: string,
    public findingSubmittedBy: string,
    public findingSubmittedDate: string,
    public workflow: any,
    public active: boolean,
    public insertedBy: string,
    public insertedAt: string,
    public updatedBy: string,
    public updatedAt: string,
    public attachmentsCount: string,
    public parentId: string,
    public parentFindingType: string,
    public riskAreaId: string,
    public mdmscId: string,
    public mdmscElementId: string,
    public mdmscSubElementId: string,

  ) { }
}