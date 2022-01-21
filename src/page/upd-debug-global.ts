
import { enableDebugDrawFs } from 'flo-draw';
import { Debug } from "flo-mat";
import { enableDebugForBooleanOp } from 'flo-boolean';
import { createMoreFunctions } from "./create-more-functions";
import { enableDebugForMat } from "flo-mat";
import { StateControl } from '../state-control/state-control';


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
    //d.directives.stopAfterHoleClosers = true;
    //d.directives.stopAfterTwoProngsNum = 13;
    //d.directives.stopAfterTwoProngs = true;
    //d.directives.stopAfterThreeProngs = true;
    //d.directives.stopAfterThreeProngsNum = 1;  // not implemented

    /*
    if (!debugOn) {
        (window as any).d = (window as any)._debug_ = undefined;
        return;
    }

    // Global shortcut for use in browser console.
    let d = (window as any).d = (window as any)._debug_ = new Debug();
    */
    //d.directives.stopAfterHoleClosers = true;
    //d.directives.stopAfterTwoProngsNum = 5;
    //d.directives.stopAfterTwoProngs = true;
    //d.directives.stopAfterThreeProngs = true;

    if (debugOn) { (window as any).d.m = createMoreFunctions(stateControl); }
}


export { updDebugGlobal }
