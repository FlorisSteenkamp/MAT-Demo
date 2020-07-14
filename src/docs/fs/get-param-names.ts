/*
import { JsonDoc } from "../i-doc/json-doc";


function getParamNames(doc: JsonDoc) {
	if (!doc.parameters) { return '()'; }
	
	let result = '(';
	let comma = '';
	let params = doc.parameters.slice();
	for (let param of params) {
		result += comma + param.name;
		comma = ', ';
	}
	
	return result + ')';			
}


export { getParamNames }
*/