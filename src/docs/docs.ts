
import { JsonDoc } from "./i-doc/json-doc";


class Docs {
    constructor(
        public functions: JsonDoc[] = [],
        public classes: JsonDoc[] = []) {
    }
}


export { Docs }
