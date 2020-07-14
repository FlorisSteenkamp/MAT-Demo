/*
import { DocsModel } from '../docs-model';
import { JsonDoc } from '../i-doc/json-doc';
import { getSignatureStr } from './get-signature-str';
import { getParamNames } from './get-param-names';
import { JsonDocRaw } from '../i-doc/json-doc-raw';
import { fromServer } from './from-server';
import { formatCodeSnippets } from './format-code-snippets';
import { DocType } from '../i-doc/doc-type';
import { paramToStr } from './param-to-str';


function showingParams(model: DocsModel, name: string) {
	return model.paramsShown[name];	
}


function showParams(model: DocsModel, name: string) {
	let shown = model.paramsShown; 
	shown[name] = !shown[name];
}


function showingImplNotes(model: DocsModel, name: string) {
	return model.implNotesShown[name];	
}


function showImplNotes(model: DocsModel, name: string) {
	let shown = model.implNotesShown; 
	shown[name] = !shown[name];
}


interface IFs {
	getSignatureStr: (doc: JsonDoc) => string; 
	getParamNames: (doc: JsonDoc) => string;
	showingParams: (model: DocsModel, name: string) => boolean;
	showParams: (model: DocsModel, name: string) => void; 
	showingImplNotes: (model: DocsModel, name: string) => boolean;
	showImplNotes: (model: DocsModel, name: string) => void;
	fromServer: ($q: angular.IQService, $http: angular.IHttpService, url: string) => angular.IPromise<JsonDocRaw>;
	formatCodeSnippets: ($timeout: angular.ITimeoutService) => void;
	paramToStr: (type: DocType) => string;
}


let fs: IFs = {
	getSignatureStr,
	getParamNames,
	showingParams,
	showParams,
	showingImplNotes,
	showImplNotes,
	fromServer,
	formatCodeSnippets,
	paramToStr
}


export { fs, IFs }
*/