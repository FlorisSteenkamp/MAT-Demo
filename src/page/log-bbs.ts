
declare var _debug_: Debug; 

import { Debug } from '../debug';
import { squaredDistanceBetween, centroid } from 'flo-vector2d';
import { closestPointOnBezierPrecise } from 'flo-bezier3';

function logBezier_(g: SVGGElement, p: number[], showDelay = 1000) {
    let bestPs;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (let ps of _debug_.generated.elems.bezier_) {
        let bezierPoint = closestPointOnBezierPrecise(ps, p);
        let d = squaredDistanceBetween(bezierPoint.p, p);
        
        if (d < bestDistance) {
            //g = generated.g;
            bestPs = ps;
            bestDistance = d;
        }
    }
    
    _debug_.fs.drawElem.bezier_(g, bestPs, undefined, showDelay);
    console.log(bestPs);
} 


function logLooseBb_(g: SVGGElement, p: number[], showDelay = 1000) {
    let poly = getNearestPoly(p, _debug_.generated.elems.looseBoundingBox_);

    _debug_.fs.drawElem.looseBoundingBox_(g, poly, undefined, showDelay);
    console.log(poly);
} 

function logTightBb_(g: SVGGElement, p: number[], showDelay = 1000) {
    let poly = getNearestPoly(p, _debug_.generated.elems.tightBoundingBox_);

    _debug_.fs.drawElem.tightBoundingBox_(g, poly, undefined, showDelay);
    console.log(poly);
} 

function logBHull_(g: SVGGElement, p: number[], showDelay = 1000) {
    let poly = getNearestPoly(p, _debug_.generated.elems.boundingHull_);

    _debug_.fs.drawElem.boundingHull_(g, poly, undefined, showDelay);
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
