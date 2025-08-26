import { emptyDebugElems } from "flo-mat";
import { ToDraw } from "../state/to-draw.js";


function createEmptyGeneratedSvgs():
        { [T in keyof ToDraw]: SVGElement[][] } {

    const elems = {} as { [T in keyof ToDraw]: SVGElement[][] };
    for (const k in emptyDebugElems) {
        // @ts-ignore
        elems[k as keyof ToDraw] = [];
    }

    return elems;
}


export { createEmptyGeneratedSvgs }
