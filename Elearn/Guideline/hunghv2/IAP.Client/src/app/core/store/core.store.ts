import { EXPAND_SIDE_BAR, COLLAPSE_SIDE_BAR, TOGGLE_SIDE_BAR } from './action/core.action';



export interface ISideBarState {
    isSidebarExpand: boolean;
}

export const INITIAL_SIDE_BAR_STATE: ISideBarState = {
    isSidebarExpand: false
};

export function sidebarReducer(state: ISideBarState = INITIAL_SIDE_BAR_STATE, action): ISideBarState {
    switch (action.type) {
        case TOGGLE_SIDE_BAR:
            {
                return { ...state, isSidebarExpand: !state.isSidebarExpand };
            }
        case COLLAPSE_SIDE_BAR:
            {
                return { ...state, isSidebarExpand: false };
            }
        case EXPAND_SIDE_BAR:
            {
                return { ...state, isSidebarExpand: true };
            }
        default:
            return state;
    }
}
