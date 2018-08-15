import { SectionItem } from "./checklist/section.model";

export class FirstLineFcAssignActionPartyViewActionItemModel {
    public id: string;
    public description: string;
    public actionPartyUserId: string;
    public actionPartyDisplayName: string;
    public actionVerifierUserId: string;
    public actionVerifierDisplayName: string;
}

export class FirstLineFcAssignActionPartyViewFindingItemModel {
    public id: string;
    public description: string;
    public numberActionItems: number;
    public listActionItems: FirstLineFcAssignActionPartyViewActionItemModel[];
}

export class FirstLineFcAssignActionPartyViewQuestionModel {
    public sectionId: string;
    public questionId: string;
    public questionReferenceNumber: string;
    public questionName: string;
    public totalFindings: number;
    public totalActionItems: number;
    public compliance: string;
    public listFindings: FirstLineFcAssignActionPartyViewFindingItemModel[];
    public listSections: SectionItem[];
}

export class FirstLineFcAssignActionPartyViewModel {
    public listQuestions: FirstLineFcAssignActionPartyViewQuestionModel[];
}