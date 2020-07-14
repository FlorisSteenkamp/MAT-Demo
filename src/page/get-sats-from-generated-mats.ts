
declare var _debug_: Debug;

import { Debug, toScaleAxis, Mat, simplifyMat, traverseEdges } from 'flo-mat';
import { StateControl } from '../state-control/state-control';


function getSatsFromGeneratedMats(
        //stateControl: StateControl,
        mats: Mat[],
        scale: number) {

    //let { upd, state } = stateControl;
    //let { appState } = state;
    //let scale = appState.pageState.satScale;

    if (scale < 1) { return; }

    let satss: Mat[][] = [];

    let generated = _debug_.generated;

    //let mats = generated.elems.mat;

    generated.elems.sat = [];
    generated.elems.maxVertex = [];
    generated.elems.leaves = [];
    generated.elems.culls = [];

    if (!mats) { return; }

    _debug_.generated = generated;
    
    satss.push(
        mats.map(mat => {
            return simplifyMat(toScaleAxis(mat, scale));
        })
    );

    //console.log(satss)
}


export { getSatsFromGeneratedMats }
