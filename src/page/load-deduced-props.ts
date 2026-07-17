declare var _debug_: Debug; 
import type { Debug } from 'flo-mat';
import { getPathsFromStr, findMats, Mat, isFullyTerminating } from 'flo-mat';
import { StateControl } from '../state-control/state-control';
import { updDebugGlobal } from './upd-debug-global';
import { getViewBoxForShape } from './viewbox';


const IS_DEBUG_ON = true;


function loadDeducedProps(
        stateControl: StateControl,
        pathStr: string) {
    
    const bezierLoops = getPathsFromStr(pathStr);
    // console.log(bezierLoops);
    const viewbox = getViewBoxForShape(bezierLoops);
    const timeStart = performance.now();

    let timingAll: number;
    let mats: Mat[] = [];

    // Resets _debug_
    updDebugGlobal(stateControl, IS_DEBUG_ON);

    const { state } = stateControl;
    const { appState } = state;
    const { pageState } = appState;
    const {
        viewMat, simplify, satScale 
    } = pageState;

    try {
        mats = findMats(bezierLoops, {
            applySat: !viewMat,
            simplify,
            satScale,
            // maxCurviness: 0.1,
            maxCurviness: 0.25,
            // maxLength: 40,
            maxLength: 40,
            // maxCurviness: 5,
            // maxLength: 4000,
            angleIncrement: 10,
            simplifyTolerance: 2**-5
        });
        // console.log(mats);
        // mats = mats.map(fixSat);
    } catch (e) {
        console.log(e);
    } finally {
        timingAll = performance.now() - timeStart;
    }

    // console.log(getAllOnLoop(mats[0].cpNode).map(getRealProngCount).filter(c => c >= 4))
    return { mats, viewbox, timingAll };
}


export { loadDeducedProps }
