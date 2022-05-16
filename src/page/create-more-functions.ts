declare var _debug_: Debug; 

import { drawFs } from 'flo-draw';
import { getBoundaryPieceBeziers, Debug, BezierPiece } from 'flo-mat';
import { showAndLogCp } from './show-and-log-cp.js';
import { StateControl } from '../state-control/state-control.js';


function createMoreFunctions(stateControl: StateControl) {
    return {
        cp: {
            next: createCpNext(stateControl),
            prev: createCpPrev(stateControl),
            nextAndAround: createNextAndAround(stateControl),
            nextOnCircle: createCpNextOnCircle(stateControl),
            prevOnCircle: createCpPrevOnCircle(stateControl),
            loop: createLoop(stateControl)
        }
    }
}


function createNextAndAround(stateControl: StateControl) {
    return function() {
        let { transientState } = stateControl;
        let { current } = transientState;
        let pageState = stateControl.state.appState.pageState;

        if (current.cpNode === undefined) { return; }

        let nextElseAround = !current.nextElseAround;
        current.nextElseAround = nextElseAround; // Toggle

        if (nextElseAround) {
            let cpNode = current.cpNode.next;
            current.cpNode = cpNode;
            showAndLogCp(current.g, cpNode, pageState.showDelay);
        } else {
            let cpNode = current.cpNode.nextOnCircle;
            current.cpNode = cpNode;
            showAndLogCp(current.g, cpNode, pageState.showDelay);
        }
    }
}


function createLoop(stateControl: StateControl) {
    return function() {
        let { transientState } = stateControl;
        let { current } = transientState;
        let pageState = stateControl.state.appState.pageState;

        if (current.cpNode === undefined) { return; }

        let cpNode = current.cpNode;
        let bps = getBoundaryPieceBeziers([cpNode, cpNode]);
        showLoop(current.g, bps);
        //console.log(bps)
        //showAndLogCp(current.g, cpNode, pageState.showDelay);
    }
}


function showLoop(g: SVGGElement, bps: BezierPiece[], showDelay = 5000) {
    for (let i=0; i<bps.length; i++) {
        let bp = bps[i];
        drawFs.bezierPiece(
            g, bp.curve.ps, bp.ts, 'blue thin20 nofill', showDelay
        );
    }
}


function createCpNextOnCircle(stateControl: StateControl) {
    return function() {
        let { transientState } =  stateControl;
        let { current } = transientState;
        let pageState = stateControl.state.appState.pageState;

        if (current.cpNode === undefined) { return; }

        let cpNode = current.cpNode.nextOnCircle;

        current.cpNode = cpNode;
        showAndLogCp(current.g, cpNode, pageState.showDelay);
    }
}


function createCpPrevOnCircle(stateControl: StateControl) {
    return function() {
        let { transientState } =  stateControl;
        let { current } = transientState;
        let pageState = stateControl.state.appState.pageState;

        if (current.cpNode === undefined) { return; }

        let cpNode = current.cpNode.prevOnCircle;

        current.cpNode = cpNode;
        showAndLogCp(current.g, cpNode, pageState.showDelay);
    }
}


function createCpNext(stateControl: StateControl) {
    return function() {
        let { transientState } =  stateControl;
        let { current } = transientState;
        let pageState = stateControl.state.appState.pageState;

        if (current.cpNode === undefined) { return; }

        let cpNode = current.cpNode.next;

        current.cpNode = cpNode;
        showAndLogCp(current.g, cpNode, pageState.showDelay);
    }
}


function createCpPrev(stateControl: StateControl) {
    return function() {
        let { transientState } =  stateControl;
        let { current } = transientState;
        let pageState = stateControl.state.appState.pageState;

        if (current.cpNode === undefined) { return; }

        let cpNode = current.cpNode.prev;
        
        current.cpNode = cpNode;
        showAndLogCp(current.g, cpNode, pageState.showDelay);
    }
}


export { createMoreFunctions }
