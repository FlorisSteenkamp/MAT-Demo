
import { DocType } from "./doc-type";
import { Comment } from "./comment";


interface Parameter {
    id?: number,
    name?: "type",
    description?: string,
    kind?: number,
    kindString?: string,
    flags?: { [index: string]: string },
    type?: DocType,
    defaultValue?: any,
    comment?: Comment
}


export { Parameter }
