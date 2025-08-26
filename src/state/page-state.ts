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
    | 'curvature'
    | 'branch'
    | 'curve'
    | 'matCurve'
    | 'salience'
    // | 'speed'


interface PageState {
    /** Won't be save to localstorage */
    deduced    : DeducedState;
    showDelay  : number;
    clickFor   : ClickFor;
    viewbox    : number[][];
    satScale   : number;
    toDraw     : ToDraw;
    glyphName: string;
    viewMat: boolean;
    simplify: boolean;
}



export { PageState, ClickFor }
