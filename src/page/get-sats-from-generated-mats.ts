declare var _debug_: Debug;

import { Debug, toScaleAxis, Mat, simplifyMat } from 'flo-mat';


function getSatsFromGeneratedMats(
        mats: Mat[],
        scale: number): void {

    return undefined;
    
    if (_debug_ === undefined) { return; }
    
    if (scale < 1) { return; }

    let satss: Mat[][] = [];

    let generated = _debug_.generated;

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
}


export { getSatsFromGeneratedMats }
