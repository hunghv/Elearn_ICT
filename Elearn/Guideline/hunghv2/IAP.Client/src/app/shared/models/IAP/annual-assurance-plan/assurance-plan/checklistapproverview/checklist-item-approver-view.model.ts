import { FindingApproverReview } from "./finding-approver-view/finding-approver-view.model";
import { SectionItem } from "../checklist/section.model";

export class ChecklistItemApproverReview {
    constructor(
        public sectionId: string,
        public sectionName: string,
        public questionId: string,
        public questionReferenceNumber: string,
        public questionName: string,
        public totalFindings: string,
        public totalActionItems: string,
        public compliance: string,
        public isApprove: string,
        public remark: string,
        public listFindings: FindingApproverReview[],
        public listSections: SectionItem[],
    ) { }
}