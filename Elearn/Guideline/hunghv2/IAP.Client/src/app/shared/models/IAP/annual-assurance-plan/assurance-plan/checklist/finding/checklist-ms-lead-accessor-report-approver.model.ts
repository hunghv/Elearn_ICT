import { FindingListItem } from './findinglist-item.model';

export class AssurancePlanFirstLineMsLeadAccessorReportApprover {
  constructor(
    public parentSectionId: string,
    public parentSectionName: string,
    public sectionId: number,
    public sectionName: string,
    public totalFindings: string,
    public overrallAssessmentRating: string,
    public level: string,
    public fcPerformance: string,
    public listQuestions: QuestiontItem[],
    public listFindings: FindingListItem[]

  ) { }
}
export class QuestiontItem {
  constructor(
    public id: string,
    public description: string
  ) { }
}


