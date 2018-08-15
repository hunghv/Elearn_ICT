import {
    Store,
    createStore,
    StoreEnhancer,
    compose
} from 'redux';
import { rootReducer } from './root.reducer';
import { RootState } from './root.state';


const devtools: StoreEnhancer<RootState> =
    window['devToolsExtension'] ?
        window['devToolsExtension']() : f => f;

export const store = createStore(
    rootReducer,
    compose(devtools)
) as Store<RootState>;
