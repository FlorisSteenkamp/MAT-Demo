declare var _debug_: Debug;

import { IDebugElems } from 'flo-mat';
import { Debug, DebugElems } from '../debug.js';
import { ToDraw } from "../state/to-draw";
import { deleteSvgs } from './delete-svgs.js';


async function drawElements(
        toDraws: ToDraw,
        svg$: SVGElement,
        $svgs: { [T in keyof DebugElems]: SVGElement[][] },
        viewbox: number[][]) {

    if (typeof _debug_ === 'undefined') { return; }

    // let svg$ = svgRef.current;
    let g = svg$.getElementsByTagName('g')[0];

    let elemss$: SVGElement[][][] = [];
    for (let elemType_ in toDraws) {
        let elemType = elemType_ as keyof IDebugElems;

        let toDraw = toDraws[elemType];

        let $elems = $svgs[elemType];
        deleteSvgs($elems);
 
        if (!toDraw) { continue; }

        let generated = _debug_.generated;

        const vbWidth = (viewbox[1][0] - viewbox[0][0]);
        
        for (let elem of generated.elems[elemType]) {
            let drawElem = _debug_.fs.drawElem[elemType] as 
                (g: SVGGElement, elem: any, classes?: string, delay?: number, scaleFactor?: number) => SVGElement[];
            $elems.push(drawElem(g, elem, undefined, 0, vbWidth/10));
        }
        
        elemss$.push($elems);
    }

    return elemss$;
}


export { drawElements }
