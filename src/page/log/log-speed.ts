import { getClosestBezierInMats } from '../../utils/get-closest-bezier-in-mats.js';
import { drawFs } from 'flo-draw';
import { curvature, evalDeCasteljau, evalDeCasteljauDd, getCurvatureExtrema, getCurvatureExtremaDd, normal } from 'flo-bezier3';
import { toLength, translate } from 'flo-vector2d';
import { Mat } from 'flo-mat';
import { getNearestCpNode } from '../get-nearest/get-nearest-cp-node.js';


function logSpeed(mats: Mat[]) {
    return function logSpeed(g: SVGGElement, p: number[], showDelay?: number) {
        // const { t: cpNode } = getNearestCpNode(mats, p);

        // console.log(CpNodeFs.getSpeed(cpNode));

        // const ps = getClosestBezierInMats(mats, p);

        // $elems.push(drawElemFs.speed(g, cpNode, undefined, 0, vbWidth/10));
    }
}


export { logSpeed }
