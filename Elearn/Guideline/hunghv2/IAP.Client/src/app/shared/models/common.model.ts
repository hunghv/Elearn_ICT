export class BaseIdNameModel {
    id: string;
    name: string;
}

export class DropdownModel {
    id: any;
    display: string;
    selected: boolean;
}

export class UserControlInfo {
    id: string;
    displayName: string;
    email: string;
    userRoles: string;
    opu: OPU;
    peoplePickerType: string;
    userName: string;
}

export class OPU {
    id: string;
    name: string;
}

export class Pager {
    totalItems?: number;
    currentPage?: number;
    pageSize?: number;
    lstPageSize?: number[];
    sort?: string;
    pages?: number[];
    startIndex?: number;
    endIndex?: number;

    constructor(obj: Pager = {} as Pager) {
        const {
            totalItems = 1,
            currentPage = 1,
            pageSize = 6,
            lstPageSize = [5, 10, 20, 50],
            sort = 'asc',
            pages = [1],
            startIndex = 1,
            endIndex = 1
        } = obj;

        this.totalItems = totalItems;
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.lstPageSize = lstPageSize;
        this.sort = sort;
        this.pages = pages;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
    }
}
