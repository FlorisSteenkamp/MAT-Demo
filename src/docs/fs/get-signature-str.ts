/*
import { JsonDoc } from "../i-doc/json-doc";
import { paramToStr } from "./param-to-str";


function getSignatureStr(doc: JsonDoc) {
	if (!doc.parameters) { return ''; }
	
	let result = '(';
	let arrow = '';
	let params = doc.parameters.slice();
	let returns = doc.returns.type;
	
	for (let param of params) {
		result += arrow + paramToStr(param.type);
		arrow = ', ';
	}
	result += ')';

	if (returns) {
		result += ' → ' + paramToStr(returns);
	}
	
	return result;			
}


export { getSignatureStr }
*/