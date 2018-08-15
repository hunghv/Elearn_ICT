import { SectionItem } from "./section.model";

export class ChecklistItem {
    constructor(
        public id: string,
        public compliance: string,
        public remarks: string,
        public question: string,
        public section: string,
        public fcPerformance: string,
        public level: string,
        public overallAssessmentRating: string,
        public parentSection: string,
        public assuranceTypeName: string,
        public active: boolean,
        public insertedBy: string,
        public insertedAt: string,
        public updatedBy: string,
        public updatedAt: string,
        public numberOfActionItem: string,
        public mumberOfFinding: string,

        public listSection: SectionItem[],
    ) { }
}