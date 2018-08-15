import { createStore, combineReducers } from 'redux';
import { sidebarReducer } from '../../core/store/core.store';

// Create a store with several reducers
export const rootReducer = combineReducers({
    sidebarState: sidebarReducer,
});
