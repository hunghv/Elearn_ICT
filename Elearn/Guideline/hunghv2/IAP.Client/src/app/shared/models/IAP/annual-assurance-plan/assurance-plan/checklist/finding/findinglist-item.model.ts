export class FindingListItem {
  constructor(
    public id: string,
    public description: string,
    public numberActionItems: number,
    public typeOfFinding: string,
    public status: string,
    public remarkerUserId: string,
    public remarkerDisplayName: string,
    public remark: string,
    public listActionItems: ChecklistCapActionItem[]
  ) { }
}
export class ChecklistCapActionItem {
  constructor(
      public id: string,
      public description: string,
      public isEndorseApprove: string,
      public remark: string
  ) { }
}
