import { enableDebugDrawFs } from 'flo-draw';
import { enableDebugForMat } from "flo-mat";
import { enableDebugForBooleanOp } from 'flo-boolean';
import { createMoreFunctions } from './create-more-functions.js';
import { StateControl } from '../state-control/state-control.js';


/** 
 * Set global debug variable.
 */
function updDebugGlobal(
        stateControl: StateControl,
        debugOn: boolean) {

    (window as any)._debug_ = {};
    enableDebugDrawFs(debugOn);
    enableDebugForMat(debugOn);
    enableDebugForBooleanOp(debugOn);

    let d = (window as any).d = (window as any)._debug_;

    //console.log(d)
    // d.directives.stopAfterHoleClosers = true;
    //d.directives.stopAfterTwoProngsNum = 1;
    //d.directives.stopAfterTwoProngs = true;
    //d.directives.stopAfterThreeProngs = true;
    //d.directives.stopAfterThreeProngsNum = 1;  // not implemented

    if (debugOn) { (window as any).d.m = createMoreFunctions(stateControl); }
}


export { updDebugGlobal }
