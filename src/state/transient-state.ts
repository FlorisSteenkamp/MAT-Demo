import { CpNode, Mat } from "flo-mat";
import { DebugElems } from "../debug.js";


interface TransientState {
    current: {
        cpNode: CpNode,
        nextElseAround: boolean,
        g: SVGGElement,
    }
    viewboxStack: number[][][],
    zoomState: Partial<{
            mouseIsDown: boolean;
            prevViewboxXY: number[];
            zoomRect: SVGRectElement;
    }>,
    $svgs: { [T in keyof DebugElems]: SVGElement[][] };
    mats: Mat[];
}


export { TransientState }
