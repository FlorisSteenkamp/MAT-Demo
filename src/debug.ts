import { IDebugElems as IDebugElemsMat } from 'flo-mat';
import { IDebugElems as IDebugElemsBoolean } from 'flo-boolean';
import { Debug as DebugMat } from 'flo-mat';
import { Debug as DebugBooleanOp } from 'flo-boolean';


type DebugElems = IDebugElemsMat & IDebugElemsBoolean;
type Debug = DebugMat & DebugBooleanOp;


export { Debug, DebugElems }
