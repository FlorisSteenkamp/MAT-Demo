declare var _debug_: Debug;

import { Debug } from '../../debug';
import { logNearestBezier } from '../log/log-nearest-bezier';
import { getViewBoxForShape } from '../viewbox';
import { logCpNode } from '../log/log-cp-node';
import { logNearestLoopSet } from '../log/log-nearest-loop-set';
import { logNearestLoopSimplified } from '../log/log-nearest-loop-simplified';
import { logNearestContainer } from '../log/log-nearest-container';
import { logBranch } from '../log/log-branch.js';
import { getViewboxXY } from '../get-viewbox-xy';
import { StateControl } from '../../state-control/state-control';
import { logK } from '../log/log-k.js';
import { logCurve } from '../log/log-curve.js';
import { logThreeProng } from '../log/log-three-prong.js';
import { logTwoProng } from '../log/log-two-prong.js';
import { logMatCurve } from '../log/log-mat-curve.js';
import { logSalience } from '../log/log-salience';


function onClick(
        stateControl: StateControl,
        svgRef: React.RefObject<SVGSVGElement | null>) {

    return (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (event.shiftKey) { 
            gotoPrevViewbox(stateControl); 
            return;
        }

        const { state } = stateControl;
        const { pageState } = state.appState;
        const { viewbox, deduced } = pageState;
        const { mats } = deduced;

        // Pixel coordinates
        const pixelsX = event.nativeEvent.offsetX;
        const pixelsY = event.nativeEvent.offsetY;
        
        const [viewboxX,viewboxY] = 
            getViewboxXY(svgRef.current!, viewbox, pixelsX, pixelsY);
        
        const svg$ = svgRef.current;
        if (!svg$) { return; }
        const g = svg$.getElementsByTagName('g')[0];

        const fs: { [key: string]: (g: SVGGElement, p: number[], delay: number) => void } = {
            // looseBoundingBox_ : logLooseBb_,
            // tightBoundingBox_ : logTightBb_,
            // boundingHull_     : logBHull_,
            twoProng          : logTwoProng(mats),
            threeProng        : logThreeProng(mats),
            bezier            : logNearestBezier(mats),
            loopSimplified    : logNearestLoopSimplified(mats),
            loopset           : logNearestLoopSet(mats),
            cp                : logCpNode(mats, stateControl),
            container         : logNearestContainer,
            curvature         : logK(mats),
            branch            : logBranch(mats),
            curve             : logCurve(mats),
            matCurve          : logMatCurve(mats),
            salience          : logSalience(mats)
        }
        
        const { clickFor, showDelay } = pageState;
        fs[clickFor](g, [viewboxX,viewboxY], showDelay);
    }
}


function gotoPrevViewbox(
        stateControl: StateControl) {

    const { transientState, state, upd } = stateControl;
    const { pageState } = state.appState;
    let viewbox = transientState.viewboxStack.pop();
    if (!viewbox) {
        const { mats } = stateControl.state.appState.pageState.deduced;
        const loops = mats.flatMap(mat => mat.meta.loops)
        const bezierLoops = loops.map(loop => loop.beziers);
        viewbox = getViewBoxForShape(bezierLoops);
    }

    upd(pageState, { viewbox });
}


export { onClick }
