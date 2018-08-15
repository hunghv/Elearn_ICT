import { DeptAAPItem } from "./departmentAAPItem.model";

export class DeptAAP {
    constructor(
        public id: string,
        public year: number,
        public corporate: any,
        public locationName: any,
        public referenceNumber: any,
        public assuranceLine: any,
        public opuName: any,
        public active: boolean,
        public insertedBy: string,
        public insertedAt: string,
        public updatedBy: string,
        public updatedAt: string,
        public deptAAPItems: DeptAAPItem[],
        public departmentName: string,
        public status: string
    ) { }

}
