import { Assessor } from "../annual-assurance-plan/assessor/assessor.model";

export class AssuranceProviderModel {
    public id?: string;
    public ref?: string;
    public assuranceProvider?: any;
    public assuranceProviderId?: string;
    public assurancePlanId?: string;
    public apHead?: string;
    public apFocal?: string;
    public apHeadName?: string;
    public apFocalName?: string;
    public scope?: string;
    public evidencePrior?: string;
    public evidenceDuring?: string;
    public expenses?: string;
    public createdAt?: Date;

    // public listAssessors: Assessor[];
}
