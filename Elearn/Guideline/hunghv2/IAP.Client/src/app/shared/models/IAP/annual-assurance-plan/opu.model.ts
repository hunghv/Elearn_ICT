import { DeptAAP } from "./departmentAAP.model";

export class OPU {

  constructor(
    public id: string,
    public year: number,
    public isManual: boolean,
    public corporate: any,
    public referenceNo: any,
    public opu: string,
    public opuName: string,
    public status: string,
    public assuranceLineName: string,
    public assuranceLineId: any,
    public mdAssuranceLines: any,
    public mdEnterprises: any,
    public mdAuditors: any,
    public auditorId: string,
    public insertedAt: string,
    public deptAAPs: DeptAAP[],
    public active: boolean,
    public enterpriseId: string
  ) { }
}
