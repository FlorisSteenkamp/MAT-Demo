import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { _upd } from './state-control/upd.js';
import { State } from './state/state.js';
import { StateControl } from './state-control/state-control.js';
import { getInitialState } from './state/get-initial-state.js';
import { defaultTransientState } from './state/default-state.js';
import { Page } from './page/page.js';
import { createRoot } from 'react-dom/client';


function App() {
    const [appState, setAppState] = useState(getInitialState);
    const [state] = useState((): State => ({ appState }));
    const [{upd, upd$}] = useState(() => _upd(state, setAppState));
    const [stateControl] = useState((): StateControl => ({ 
        state, upd, upd$, transientState: defaultTransientState,
    }));

    // console.log(defaultTransientState);

    const { pageState } = appState;

    return (
        <Router>
        <main>
            <Routes>
                <Route path="/" element={<Page stateControl={stateControl} pageState={pageState} />} />
            </Routes>
        </main>
        </Router>
    );
}


const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);

// ReactDOM.render(<App tab="home"/>, document.getElementById('app'));
