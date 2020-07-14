
import { DocType } from './doc-type';
import { Signature } from './signature';
import { Tag } from './tag';


interface JsonDocRaw {
    id?: number;
    name?: string;
    kind?: number;
    flags?: { [index: string]: boolean };
    kindString?: 
        | 'Function' 
        | 'External module' 
        | 'Class'
        | 'Property';
    originalName?: string;
    comment?: {
        shortText?: string;
        tags?: Tag[];
    };
    signatures?: Signature[];
    sources?: [
        {
            fileName?: string;
            line?: number;
            character?: number;
        }
    ],
    groups?: {
        title?: string;
        kind?: number;
        children?: number[];
    }[];
    children?: JsonDocRaw[];
}


export { JsonDocRaw }
