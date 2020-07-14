
import { DocType } from "./doc-type";
import { Comment } from "./comment";
import { Parameter } from "./parameter";


interface Signature {
    id?: number,
    name?: string,
    kind?: number,
    type?: DocType,
    kindString?: string,
    flags?: { [index: string]: string },
    parameters?: Parameter[],
    comment?: Comment
}


export { Signature }
