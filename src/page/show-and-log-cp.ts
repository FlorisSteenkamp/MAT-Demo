declare var _debug_: Debug; 

import { Debug } from 'flo-mat';
import { CpNode } from 'flo-mat';
import { drawFs } from 'flo-draw';


function showAndLogCp(g: SVGGElement, cpNode: CpNode, showDelay = 2000) {
    let cp = cpNode.cp;
    let pos = cp.pointOnShape;
    drawFs.crossHair(g, pos.p, 'nofill thin5 red', 2, showDelay);
    drawFs.line(g, [pos.p, cp.circle.center], 'nofill thin5 red', showDelay);
    logCpNode(cpNode);
}


function logCpNode(cpNode: CpNode) {
    console.log(cpNode);
    let cp = cpNode.cp;
    console.log(cp.pointOnShape.t, cp.order, cp.order2, cpNode.isHoleClosing);
}


export { showAndLogCp }
