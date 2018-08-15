import { BaseIdNameModel } from "./common.model";

export class UserInformation {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    lastLoginDate: string;
    opu: BaseIdNameModel;

    //roles
    userRoles: string;
    listUserRoles: string[];
}