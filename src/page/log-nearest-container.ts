declare var _debug_: Debug; 

import { getClosestSquareDistanceToRect } from 'flo-mat';
import { Debug } from '../debug.js';


function logNearestContainer(g: SVGGElement, p: number[], showDelay = 1000) {
    //let g;
    let bestContainer;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (let container of _debug_.generated.elems.container) {
        let dSquared = getClosestSquareDistanceToRect(container.box, p);
        
        if (dSquared < bestDistance) {
            bestContainer = container;
            bestDistance = dSquared;
        }
    }
    
    _debug_.fs.drawElem.container(/*_debug_.generated.*/g, bestContainer, '', showDelay);
    console.log(bestContainer);
    for (let x of bestContainer.xs) {
        //console.log('x', x.curve.ps.toString())
    }
}


export { logNearestContainer };
