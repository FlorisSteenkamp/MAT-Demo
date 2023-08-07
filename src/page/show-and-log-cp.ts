declare var _debug_: Debug; 

import { Debug } from 'flo-mat';
import { CpNode,
    getCpNodesOnCircle,
    enhanceCpNode,
    traverseCp
} from 'flo-mat';
import { drawFs } from 'flo-draw';


function showAndLogCp(
        g: SVGGElement,
        cpNode: CpNode,
        showDelay = 2000,
        scale = 1) {

    let cp = cpNode.cp;
    let pos = cp.pointOnShape;
    drawFs.crossHair(g, pos.p, 'nofill thin5 red', scale*0.0002, showDelay);
    drawFs.line(g, [pos.p, cp.circle.center], 'nofill thin20 red', showDelay);
    drawFs.circle(g, cp.circle, 'nofill thin5 blue', showDelay)
    
    // Log
    const prongCount = getCpNodesOnCircle(cpNode).length;
    const enhancedCpNode = enhanceCpNode(cpNode);
    console.log(enhancedCpNode);
    console.log(enhancedCpNode.ordering);
    // console.log(prongCount, cp.pointOnShape.t, cp.order, cp.order2, cpNode.isHoleClosing);
    console.log(traverseCp(cpNode).map(enhanceCpNode));
}


export { showAndLogCp }
