import { AppState } from './app-state.js';
import { TransientState } from './transient-state.js';
import { PageState } from './page-state.js';
import { createEmptyGeneratedSvgs } from '../page/create-empty-generated-svgs.js';
import { DebugElems } from '../debug.js';
import { DeducedState } from './deduced-state.js';


const defaultTransientState: TransientState = {
    current: {
        cpNode: undefined,
        nextElseAround: false,
        g: undefined,
    },
    // viewboxStack: [],
    zoomState: {},
    $svgs: createEmptyGeneratedSvgs(),
    mats: undefined
}


const defaultToDraw: { [T in keyof DebugElems]: boolean } = {
    mat                  : true,
    sat                  : true,
    minY                 : false,
    bezier_              : false,
    looseBoundingBox_    : false,
    tightBoundingBox_    : false,
    boundingHull_        : false,
    looseBoundingBox     : false,
    tightBoundingBox     : false,
    sharpCorner          : false,
    dullCorner           : false,
    oneProng             : false,
    oneProngAtDullCorner : false,
    twoProng_regular     : false,
    twoProng_holeClosing : false,
    twoProng_failed      : false,
    twoProng_notAdded    : false,
    twoProng_deleted     : false,
    vertex               : false,
    cpNode               : false,
    threeProng           : false,
    boundingHull         : false,
    loop                 : false,
    loops                : false,
    maxVertex            : false,
    leaves               : false,
    culls                : false,
    intersection         : false,
    container            : false,
    loopPre              : false,
    loopsPre             : false
}


const defaultDeduced: DeducedState = {
    path: ''
}

const defaultPageState: PageState = {
    deduced: defaultDeduced,
    showDelay: 1000,
    clickFor: 'twoProng',
    satScale: 1.5,
    threeProng: {
        spokes   : false,
        trace    : false,
        boundary : false,
    },
    toDraw: defaultToDraw,
    viewbox: [[0,0],[100.100]],
    vectorName : 'holy poly',
    viewboxStack: []
}


const defaultAppState: AppState = {
    version: 2,
    pageState: defaultPageState
};


export { 
    defaultAppState, 
    defaultPageState, 
    defaultTransientState, 
    defaultDeduced 
}
