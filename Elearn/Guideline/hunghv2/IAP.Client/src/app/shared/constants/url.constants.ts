import { environment } from '../../../environments/environment';

export const UrlConstants = {
    ACTION_ITEM: 'actionItem',
    ATTACHMENT: 'attachment',
    ACTION_ITEM_PROGRESS: 'actionitemprogress'
};

export const MasterDataUrlConstants = {
    SHARE_TO_LOCATION: `${environment.apiServer}mdLocations`,
    RISK_AREA: `${environment.apiServer}getallriskarea`,
    CHECK_LIST: `${environment.apiServer}getChecklistbyRiskAreaId/`,
    ELEMENT: `${environment.apiServer}getSectionByMDFCId/`,
    SUB_ELEMENT: `${environment.apiServer}getSubSectionByParentId/`,
    PRIORITY: `${environment.apiServer}getPriority`,
};
