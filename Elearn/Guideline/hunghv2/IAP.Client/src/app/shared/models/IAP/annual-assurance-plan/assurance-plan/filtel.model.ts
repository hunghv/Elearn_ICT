


export class AssuranceFilterModel {

    constructor(
        public refNo,
        public title,
        public assuranceLineId,
        public opuOrCompanyId,
        public riskAreaId,
        public departmentId,
        public mdAssuranceType,
        public assuranceTypeId,
        public year,
        public mdChecklist,
        public checklistId,
        public mdAssuranceLines,
        public assuranceProvider,
        public monthTo,
        public monthFrom,
        public leadAssessor,
        public assessorOrAuditor,
        public teamLeader,
        public assuranceStartDate,
        public assuranceEndDate,
        public location,
        public mdEnterprises,
        public mdRiskArea,
        public mdAssuranceProvider,
        public mdLocation,
    ) { }
}
