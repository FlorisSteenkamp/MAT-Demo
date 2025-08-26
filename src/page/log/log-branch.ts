import { drawFs } from "flo-draw";
import { Mat, CpNodeFs, drawElemFs } from "flo-mat"
import { getNearestCpNodeByMatCurve } from '../get-nearest/get-nearest-mat-curve.js';

const { getBranch, getBranchBeziers } = CpNodeFs;


function logBranch(mats: Mat[]) {
    return  function logBranch(g: SVGGElement, p: number[], showDelay?: number) {
        const cpNode = getNearestCpNodeByMatCurve(mats, p).t;

        // const branch = getBranch(cpNode);
        const pss = getBranchBeziers(cpNode);

        // console.log(pss);
        console.log(cpNode);
        drawElemFs.cpNode(g, cpNode, undefined, showDelay)

        for (const ps of pss) {
            drawFs.bezier(g, ps, 'thin20 red nofill', showDelay);
        }
    }
}


export { logBranch }
