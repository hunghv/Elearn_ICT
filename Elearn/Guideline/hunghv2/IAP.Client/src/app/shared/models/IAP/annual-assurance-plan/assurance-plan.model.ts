import { AssuranceProviderModel } from '../assurance-provider/assurance-provider.model';

export class AssurancePlan {
  public id: string;
  public referenceNumber: string;
  public status: string;
  public isAutoCreated: boolean;
  public year: string;
  public description: string;
  public category: string;
  public title: string;
  public riskArea: string;
  public subType: string;
  public lineName: string;
  public month: number;
  public startDate: string;
  public endDate: string;
  public checkList: string;
  public assessors: string;
  public scope: string;
  public proposedAgenda: string;
  public remark: string;
  public insertedAt: string;

  public deptAapItemId: string;
  public mdFcId: string;
  public mdMscId: string;
  public mdAssuranceReferenceId: string;
  public mdRiskAreaId: string;
  public mdAssuranceLineId: string;
  public mdAssuranceTypeId: string;
  public mdEnterpriseId: string;
  public mdDepartmentId: string;
  public mdLocationId: string;

  public assuranceTypeName: string;
  public mdLocationName: string;
  public mdEnterpriseName: string;
  public mdDeparmentName: string;
  public monthName: string;
  public mdRiskAreaName: string;
  public leadAssessorName: string;
  public teamLeadName: string;

  // line2
  public assesseeOPU: string;
  public leadAssessor: string;
  public teamLead: string;

  // helper
  public isSecondLine: boolean;
  public isAssuranceTypeFc: boolean;

  // public listAssuranceProviders: AssuranceProviderModel[];
  public acknowledgedBy: string;
  public approvedBy: string;
}
