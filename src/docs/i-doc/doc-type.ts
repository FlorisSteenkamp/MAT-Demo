
import { Decleration } from "./declaration";


type DocTypeType =
    | 'intrinsic' 
    | 'array' 
    | 'reflection' 
    | 'reference'
    | 'union'
    | 'intersection';


interface DocType {
    type?: DocTypeType;
    name?: string;
    elementType?: DocType;
    types?: DocType[]; // Relevant to union types only
    declaration?: Decleration
}


export { DocType, DocTypeType }
