
import { DebugElems } from "../debug";


function createEmptyGeneratedSvgs(): { [T in keyof DebugElems]: SVGElement[][] }  {
    return {
        oneProng             : [],
        sharpCorner          : [],
        twoProng_regular     : [],
        twoProng_holeClosing : [],
        threeProng           : [],
        dullCorner           : [],
        oneProngAtDullCorner : [],
        bezier_              : [],
        looseBoundingBox_    : [],
        tightBoundingBox_    : [],
        boundingHull_        : [],
        looseBoundingBox     : [],
        tightBoundingBox     : [],
        boundingHull         : [],
        minY                 : [],
        mat                  : [],
        sat                  : [],
        loop                 : [],
        loops                : [],
        maxVertex            : [],
        leaves               : [],
        culls                : [],
        intersection         : [],
        twoProng_failed      : [],
        twoProng_notAdded    : [],
        twoProng_deleted     : [],
        vertex               : [],
        cpNode               : [],
        container            : [],
    };
}


export { createEmptyGeneratedSvgs }
