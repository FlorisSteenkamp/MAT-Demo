
import { ToDraw } from './to-draw';
import { DeducedState } from './deduced-state';


type ClickFor = 
    | 'bezier_'
    | 'looseBoundingBox_'
    | 'tightBoundingBox_'
    | 'boundingHull_'
    | 'twoProng'
    | 'threeProng'
    | 'bezier'
    | 'container'
    | 'loopSimplified'
    | 'loopset'
    | 'cp'


interface PageState {
    /** Won't be save to localstorage */
    deduced    : DeducedState;
    showDelay  : number;
    clickFor   : ClickFor;
    viewbox    : number[][];
    satScale   : number;
    toDraw     : ToDraw;
    threeProng: {
        spokes   : boolean;
        trace    : boolean;
        boundary : boolean;
    };
    vectorName: string;
}



export { PageState }
