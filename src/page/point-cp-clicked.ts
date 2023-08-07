declare var _debug_: Debug; 

import { Debug } from 'flo-mat';
import { squaredDistanceBetween } from 'flo-vector2d';
import { CpNode } from 'flo-mat';
import { showAndLogCp } from './show-and-log-cp.js';
import { StateControl } from '../state-control/state-control.js';


function pointCpClicked(stateControl: StateControl) {

    return function(g: SVGGElement, p: number[], showDelay = 1000) {
        let { transientState } = stateControl;
        let { current } = transientState;
        let bestD = Number.POSITIVE_INFINITY;
        let bestCpNode: CpNode = undefined;

        let generated = _debug_.generated;

        for (let cpNode of generated.elems.cpNode) {
            let pos = cpNode.cpNode.cp.pointOnShape;

            let d = squaredDistanceBetween(p, pos.p);
            if (d < bestD) {
                bestD = d;
                bestCpNode = cpNode.cpNode;
            }
        }

        current.g = g;

        if (bestCpNode === undefined) { return; }
        
        current.cpNode = bestCpNode;

        showAndLogCp(g, bestCpNode, showDelay, );
    }
}


export { pointCpClicked }
