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
    readonly deduced: DeducedState;
    readonly showDelay: number;
    readonly clickFor : ClickFor;
    readonly viewbox: number[][];
    readonly satScale: number;
    readonly toDraw: ToDraw;
    readonly glyphName: string;
    readonly viewMat: boolean;
    readonly simplify: boolean;
}



export { PageState, ClickFor }
