import { AppState } from './app-state.js';
import { defaultAppState, defaultDeduced } from './default-state.js';


function getInitialState(): AppState {
    let appStateJson = localStorage.getItem('app-state');
    if (!appStateJson) { return defaultAppState; }

    let storedState: AppState = JSON.parse(appStateJson);
    if (storedState.version !== defaultAppState.version) {
        return defaultAppState;
    }

    return { 
        ...storedState, 
        pageState: { 
            ...storedState.pageState, 
            deduced: defaultDeduced
        } 
    };
}


export { getInitialState }
