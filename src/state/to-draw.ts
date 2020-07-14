
import { DebugElems } from '../debug';


type ToDraw = { [T in keyof DebugElems]: boolean }


export { ToDraw }
