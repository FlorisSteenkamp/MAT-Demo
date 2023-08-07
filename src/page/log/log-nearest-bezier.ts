declare var _debug_: Debug; 

import { squaredDistanceBetween } from 'flo-vector2d';
import { closestPointOnBezier } from 'flo-bezier3';
import { drawFs } from 'flo-draw';
import { Debug } from '../../debug.js';
import { Curve } from 'flo-mat';


function logNearestBezier(
        g: SVGGElement, p: number[], showDelay = 1000) {

    // let bestPs;
    let bestCurve: Curve | undefined = undefined;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (let loops of _debug_.generated.elems.loops) {
        let bezierLoops = loops;
        let generated = _debug_.generated;

        for (let loop of bezierLoops) {
            const curve = loop.curves[0];
            let curve_ = curve;
            do {
                const ps = curve_.ps;
                const bezierPoint = closestPointOnBezier(ps, p);
                const d = squaredDistanceBetween(bezierPoint.p, p);
                if (d < bestDistance) {
                    // bestPs = ps;
                    bestCurve = curve_;
                    bestDistance = d;
                }

                curve_ = curve_.next;
            } while (curve !== curve_);

            // const beziers = loop.beziers;
            // for (let ps of beziers) {
            //     const bezierPoint = closestPointOnBezier(ps, p);
            //     const d = squaredDistanceBetween(bezierPoint.p, p);
            //     if (d < bestDistance) {
            //         //g = generated.g;
            //         bestPs = ps;
            //         bestDistance = d;
            //     }
            // }
        }
    }
    
    // drawFs.bezier(g, bestPs, undefined, showDelay);
    // console.log(bestPs);
    drawFs.bezier(g, bestCurve.ps, undefined, showDelay);
    console.log(bestCurve);
}


export { logNearestBezier }
