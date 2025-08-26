declare var _debug_: Debug; 

import { squaredDistanceBetween, centroid } from 'flo-vector2d';
import { closestPointOnBezier } from 'flo-bezier3';
import { Debug } from '../../debug';
import { drawElemFs } from 'flo-mat';
import { drawFs } from 'flo-draw';


function logBezier_(g: SVGGElement, p: number[], showDelay = 1000) {
    let bestPs: number[][] = undefined!;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (let ps of _debug_.generated.elems.bezier_) {
        let bezierPoint = closestPointOnBezier(ps, p);
        let d = squaredDistanceBetween(bezierPoint.p, p);
        
        if (d < bestDistance) {
            bestPs = ps;
            bestDistance = d;
        }
    }
    
    drawFs.bezier(g, bestPs, undefined, showDelay);
    console.log(bestPs);
} 


function logLooseBb_(g: SVGGElement, p: number[], showDelay = 1000) {
    let poly = getNearestPoly(p, _debug_.generated.elems.looseBoundingBox_)!;

    drawElemFs.looseBoundingBox(g, poly, undefined, showDelay);
    console.log(poly);
} 

function logTightBb_(g: SVGGElement, p: number[], showDelay = 1000) {
    let poly = getNearestPoly(p, _debug_.generated.elems.tightBoundingBox_)!;

    drawElemFs.tightBoundingBox(g, poly, undefined, showDelay);
    console.log(poly);
} 

function logBHull_(g: SVGGElement, p: number[], showDelay = 1000) {
    let poly = getNearestPoly(p, _debug_.generated.elems.boundingHull_)!;

    drawElemFs.boundingHull(g, poly, undefined, showDelay);
    console.log(poly);
}


function getNearestPoly(p: number[], polys: number[][][]) {
    let bestPoly;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (let poly of polys) {
        let c = centroid(poly);
        let d = squaredDistanceBetween(c, p);
            
        if (d < bestDistance) {
            bestPoly = poly;
            bestDistance = d;
        }
    }
    
    return bestPoly;
}


export { logBezier_, logLooseBb_, logTightBb_, logBHull_ }
