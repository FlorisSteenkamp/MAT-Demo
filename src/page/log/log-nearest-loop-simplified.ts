declare var _debug_: Debug; 

import { squaredDistanceBetween } from 'flo-vector2d';
import { closestPointOnBezier } from 'flo-bezier3';
import { getLoopArea } from 'flo-boolean';
import { beziersToSvgPathStr, Loop, Mat } from 'flo-mat';
import { drawFs } from 'flo-draw';
import { Debug } from '../../debug';
import { getLoopCentroid } from './get-loop-centroid';


function logNearestLoopSimplified(
        mats: Mat[]) {
    
    return (g: SVGGElement,
            p: number[],
            showDelay = 1000) => {
    
        let bestLoop: Loop = undefined!;
        let bestDistance = Number.POSITIVE_INFINITY;

        const loops = mats.flatMap(mat => mat.meta.loops);

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
        console.log(beziersToSvgPathStr(bestLoop.beziers));
        for (let curve of bestLoop.curves) {
            drawFs.bezier(g, curve.ps, 'thin20 red nofill', showDelay);
        }
        //console.log(loop);
    }
}


export { logNearestLoopSimplified };
