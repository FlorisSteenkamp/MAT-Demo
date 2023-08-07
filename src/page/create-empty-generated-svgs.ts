import { DebugElems } from "../debug.js";


function createEmptyGeneratedSvgs(): { [T in keyof DebugElems]: SVGElement[][] }  {
    return {
        oneProng             : [],
        oneProngAtDullCorner : [],
        sharpCorner          : [],
        twoProng_regular     : [],
        twoProng_holeClosing : [],
        threeProng           : [],
        dullCorner           : [],
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
        loopPre              : [],
        loopsPre             : [],
    };
}


export { createEmptyGeneratedSvgs }
