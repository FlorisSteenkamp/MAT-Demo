
import { DocType } from './doc-type';
import { Signature } from './signature';
import { Comment } from './comment';
import { Tag } from './tag';
import { Parameter } from './parameter';

interface JsonDoc {
    name?: string,
    description?: string,
    htmlDescription?: any, // $sce(description)
    parameters?: Parameter[],
    kindString?: string,
    originalName?: string,
    comment?: Comment,
    signature?: Signature,
    tags?: Tag[],
    example?: any, // $sce(example)
    returns?: {
        description?: '',
        type?: DocType
    }
}


export { JsonDoc }
