import { Tag } from "./tag";

interface Comment {
    shortText?: string,
    text?: string,
    returns?: string,
    tags?: Tag[]
}


export { Comment }
