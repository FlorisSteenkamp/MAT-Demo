import { getPathsFromStr, findMats, Mat, CpNodeFs } from 'flo-mat';
import { StateControl } from '../state-control/state-control';
import { updDebugGlobal } from './upd-debug-global';
import { getViewBoxForShape } from './viewbox';


const IS_DEBUG_ON = true;


function loadDeducedProps(
        stateControl: StateControl,
        pathStr: string) {
    
    const bezierLoops = getPathsFromStr(pathStr);
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
            maxCurviness: 0.05,
            maxLength: 40,
            // maxCurviness: 5,
            // maxLength: 4000,
            angleIncrement: 15,
            simplifyTolerance: 2**-6
        });
    } catch (e) {
        console.log(e);
    } finally {
        timingAll = performance.now() - timeStart;
    }

    // console.log(getAllOnLoop(mats[0].cpNode).map(getRealProngCount).filter(c => c >= 4))
    return { mats, viewbox, timingAll };
}


export { loadDeducedProps }
