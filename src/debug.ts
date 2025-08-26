import { DebugElems as DebugElemsMat } from 'flo-mat';
import { IDebugElems as DebugElemsBoolean } from 'flo-boolean';
import { Debug as DebugMat } from 'flo-mat';
import { Debug as DebugBooleanOp } from 'flo-boolean';


type DebugElems = DebugElemsMat & DebugElemsBoolean;
type Debug = DebugMat & DebugBooleanOp;


export { Debug, DebugElems }
