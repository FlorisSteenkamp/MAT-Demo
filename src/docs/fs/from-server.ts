/*
import { JsonDocRaw } from "../i-doc/json-doc-raw";


function fromServer(
        $q: angular.IQService,
        $http: angular.IHttpService, 
        url: string) {
		
    let docs$ = $http<JsonDocRaw>({
        url    : url,
        method : 'GET',
    })
    .then(
        resp => resp.data, 
        error => $q.reject(error)
    )
    
    return docs$;
}


export { fromServer }
*/