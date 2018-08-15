import { MDRiskArea } from "../master-data/risk-area.model";
import { MDLocation } from "../master-data/location.model.1";
import { MDAssuranceType } from "../master-data/assurance-type.model";
import { MDFC } from "../master-data/checklist-fc.model";

export class DeptAAPItem {
    public id: string
        public deptAAPId: string
        public year: number
        public opuRequirement :number
        public ptsRequirement : number
        public numberOfPlan : number
        public frequency : string
        public corporate: any
        public title: string
        public description: string
        public referenceNo: any
        public assuranceLine: any
        public status : string
        public active: boolean
        public isTheConsolidateComplete : boolean
        public insertedBy: string
        public insertedAt: string
        public updatedBy: string
        public updatedAt: string
        public riskAreaId: string
        public riskAreaName: string
        public riskAreas : MDRiskArea[]
        public locationId: string
        public locationName: string
        public locations : MDLocation[]
        public assuranceTypeId: string
        public assuranceTypeName: string
        public assuranceTypes : MDAssuranceType
        public checklistId : string
        public checklistName : string
        public checklists : MDFC[]
        public planedAssurance : number[]
    constructor(
        
    ) { }
}