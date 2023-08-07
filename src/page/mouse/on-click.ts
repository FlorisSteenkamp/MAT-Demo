declare var _debug_: Debug;

import { Debug } from '../../debug.js';
import { logNearestBezier } from '../log/log-nearest-bezier.js';
import { getViewBoxForShape, toViewBoxStr } from '../viewbox.js';
import { pointCpClicked } from '../point-cp-clicked.js';
import { logNearestLoopSet } from '../log/log-nearest-loop-set.js';
import { logNearestLoopSimplified } from '../log/log-nearest-loop-simplified.js';
import { logNearestContainer } from '../log/log-nearest-container.js';
import { logBezier_, logLooseBb_, logTightBb_, logBHull_ } from '../log/log-bbs.js';
import { getViewboxXY } from '../get-viewbox-xy.js';
import { StateControl } from '../../state-control/state-control.js';


function onClick(
        stateControl: StateControl,
        svgRef: React.MutableRefObject<SVGSVGElement>,
        viewbox: number[][]) {

    return (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (event.shiftKey) { 
            gotoPrevViewbox(stateControl); 
            return;
        }

        // Pixel coordinates
        let pixelsX = event.nativeEvent.offsetX;
        let pixelsY = event.nativeEvent.offsetY;
        
        let [viewboxX,viewboxY] = 
            getViewboxXY(svgRef.current!, viewbox, pixelsX, pixelsY);
        
        let { state } = stateControl;
        let { pageState } = state.appState;
        let svg$ = svgRef.current;
        if (!svg$) { return; }
        let g = svg$.getElementsByTagName('g')[0];

        // Pixel coordinates
        let ox = event.nativeEvent.offsetX;
        let oy = event.nativeEvent.offsetY;

        // SVG actual coordinates
        let viewboxXY = getViewboxXY(svg$, pageState.viewbox, ox, oy);

        const { spokes, trace, boundary } = pageState.threeProng;
        let logNearestThreeProng = _debug_.fs.threeProng.logNearest(
            spokes, trace, boundary
        );

        const vbWidth = (viewbox[1][0] - viewbox[0][0]);
        const scale = vbWidth/10;
        const logNearestTwoProng = (g: SVGGElement, p: number[], showDelay?: number) => {
            _debug_.fs.twoProng.logNearest(spokes, trace, boundary)(
                g,p,showDelay,scale
            )
        }

        let fs: { [key: string]: (g: SVGElement, p: number[], delay: number) => void } = {
            bezier_           : logBezier_,
            looseBoundingBox_ : logLooseBb_,
            tightBoundingBox_ : logTightBb_,
            boundingHull_     : logBHull_,
            twoProng          : logNearestTwoProng,
            // twoProng       : _debug_.fs.twoProng.logNearest,
            threeProng        : logNearestThreeProng,
            bezier            : logNearestBezier,
            loopSimplified    : logNearestLoopSimplified,
            loopset           : logNearestLoopSet,
            cp                : pointCpClicked(stateControl),
            container         : logNearestContainer,
        }
        
        let { clickFor, showDelay } = pageState;
        fs[clickFor](g, [viewboxX,viewboxY], showDelay);
    }
}


function gotoPrevViewbox(stateControl: StateControl) {
    let { transientState, state, upd } = stateControl;
    let { pageState } = state.appState;
    // let viewbox = transientState.viewboxStack.pop();
    let viewbox = pageState.viewboxStack.pop();
    if (!viewbox) {
        let loops = _debug_.generated.elems.loop;
        let bezierLoops = loops.map(loop => loop.beziers);
        viewbox = getViewBoxForShape(bezierLoops);
    }

    upd(pageState, { viewbox });
}


export { onClick }
