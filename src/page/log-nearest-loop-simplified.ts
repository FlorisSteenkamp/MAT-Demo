
declare var _debug_: Debug; 

import { Debug } from '../debug';
import { squaredDistanceBetween } from 'flo-vector2d';
import { closestPointOnBezierPrecise } from 'flo-bezier3';
import { getLoopArea } from 'flo-boolean';
import { beziersToSvgPathStr, Loop } from 'flo-mat';
import { getLoopCentroid } from './get-loop-centroid';
import { drawFs } from 'flo-draw';


function logNearestLoopSimplified(g: SVGGElement, p: number[], showDelay = 1000) {
    //let bestCurve;
    let bestLoop: Loop;
    let bestDistance = Number.POSITIVE_INFINITY;

    let generated = _debug_.generated;
    let loops = generated.elems.loop;

    for (let loop of loops) {
        let p_ = getLoopCentroid(loop);
        let d = squaredDistanceBetween(p_, p);
        if (d < bestDistance) {
            bestLoop = loop;
            bestDistance = d;
        }
    }
        
    
    //let loop = bestLoop;
    console.log('area', getLoopArea(bestLoop));
    //console.log(beziersToSvgPathStr(loop.beziers));
    for (let curve of bestLoop.curves) {
        drawFs.bezier(g, curve.ps, 'thin20 red nofill', showDelay);
    }
    //console.log(loop);
}


export { logNearestLoopSimplified };
