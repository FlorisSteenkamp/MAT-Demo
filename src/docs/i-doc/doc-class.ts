
import { JsonDoc } from "./json-doc";
import { DocType } from "./doc-type";


interface DocClass extends JsonDoc {
    properties: DocType[],
}


export { DocClass }
