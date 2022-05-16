declare var _debug_: Debug; 

import { squaredDistanceBetween } from 'flo-vector2d';
import { closestPointOnBezier } from 'flo-bezier3';
import { drawFs } from 'flo-draw';
import { Debug } from '../debug.js';


function logNearestBezier(g: SVGGElement, p: number[], showDelay = 1000) {
    //let g;
    let bestPs;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (let loops of _debug_.generated.elems.loops) {
        let bezierLoops = loops;
        let generated = _debug_.generated;

        for (let loop of bezierLoops) {
            let beziers = loop.beziers;
            for (let ps of beziers) {
                let bezierPoint = closestPointOnBezier(ps, p);
                let d = squaredDistanceBetween(bezierPoint.p, p);
                
                if (d < bestDistance) {
                    //g = generated.g;
                    bestPs = ps;
                    bestDistance = d;
                }
            }
        }
    }
    
    drawFs.bezier(g, bestPs, undefined, showDelay);
    console.log(bestPs);
}


export { logNearestBezier }
