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
            simplifyTolerance: 2**-1
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


// FOR TESTING ONLY!!!
/**
 * In-place removes trivial 3-prongs from the SAT graph.
 * 
 * These are 3-prongs that are induced by the SAT construction, and do
 * not correspond to actual 3-prongs in the shape. They can be identified as
 * nodes in the SAT graph whose next node is the same as their nextOnCircle node.
 * 
 * @param sat 
 */
function fixSat(
        sat: Mat): Mat {

    let { cpNode: _cpNode } = sat;

    // const cpNodes = getAllOnLoop(sat.cpNode);

    // TODO - skip the hole-closing dummy node AND SAT-induced trivial 3-prongs
    // TODO while (!isFullyTerminating(_cpNode)) {
    //     _cpNode = _cpNode.next;
    // }
    let cpStart = _cpNode;
    // let cpNode = cpStart.next;
    let cpNode = cpStart;
    // console.log(cpStart.cp.pointOnShape.p);
    // let ii = 0;
    // const M = 200;
    do {
        // console.log(cpNode.cp.pointOnShape.p);
        // if (cpNode.cp.pointOnShape.p[0] === 62.888732585532225) {
        //     console.log('a')
        // }
        if (isFullyTerminating(cpNode) || cpNode.isHoleClosing) {
            cpNode = cpNode.next;
            continue;
        }

        if (cpNode.next.next === cpNode.nextOnCircle.nextOnCircle) {
            console.log('cpNode.next.next === cpNode.nextOnCircle.nextOnCircle');
            // cpNode = cpNode.next;
            // continue;
        }

        if (cpNode.next !== cpNode.nextOnCircle) {
            cpNode = cpNode.next;
            continue;
        }

        // console.log(cpNode);

        //-----------------------------
        // Delete the trivial 3-prong.
        //-----------------------------
        // console.log('Removing SAT-induced trivial 3-prong');

        const next = cpNode.next;

        // console.log(next.cp.pointOnShape.p);

        const nextNext = next.next;
        const nextNextOC = cpNode.next.nextOnCircle;

        cpNode.next = nextNext;
        cpNode.nextOnCircle = nextNextOC;

        nextNext.prev = cpNode;

        nextNextOC.prevOnCircle = cpNode;

        if (next === cpStart) {
            // console.log('cpStart was the trivial 3-prong node, moving cpStart');  // TODO - remove
            cpStart = cpNode;  // ...otherwise the loop will never terminate
        }

        cpNode = cpNode.next;
    } while (cpNode !== cpStart/* && ii++ < M*/)

    // console.log('----');

    sat.cpNode = cpStart;
    // if (ii >= M) {
    //     console.log(`Warning: fixSat loop exceeded ${M} iterations`);
    // }

    return sat;
}