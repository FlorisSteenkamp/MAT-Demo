import { emptyDebugElems } from 'flo-mat';
import { AppState } from './app-state.js';
import { TransientState } from './transient-state.js';
import { PageState } from './page-state.js';
import { createEmptyGeneratedSvgs } from '../page/create-empty-generated-svgs.js';
import { DeducedState } from './deduced-state.js';
import { ToDraw } from './to-draw.js';
import { mapObj } from '../utils/map-obj.js';


const defaultTransientState: TransientState = {
    current: {
        cpNode: undefined!,
        nextElseAround: false,
        g: undefined!,
    },
    viewboxStack: [],
    zoomState: { mouseIsDown: false, prevViewboxXY: [], zoomRect: undefined! },
    $svgs: createEmptyGeneratedSvgs(),
    // mats: undefined!
}


const defaultToDraw: ToDraw = {
    ...mapObj(() => false, emptyDebugElems),
    mat: true,
} as ToDraw;


const defaultDeduced: DeducedState = {
    pathStr: '',
    mats: []
}

const defaultPageState: PageState = {
    deduced: defaultDeduced,
    showDelay: 1000,
    clickFor: 'twoProng',
    satScale: 1.5,
    // @ts-ignore
    toDraw: defaultToDraw,
    viewbox: [[0,0],[1450,1450]],
    glyphName : 'quotedbl',
    viewMat: true,
    simplify: true,
}


const defaultAppState: AppState = {
    version: 4,
    pageState: defaultPageState
};


export { 
    defaultAppState, 
    defaultPageState, 
    defaultTransientState, 
    defaultDeduced 
}
