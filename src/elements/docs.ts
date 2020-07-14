
// These declerations are to prevent WebPack to bundle angular, etc. and prevent
// bloat during development (e.g. long WebPack build times).
/*
declare var angular: angular.IAngularStatic;

import { fs, IFs } from '../docs/fs/fs';
import { DocsModel } from '../docs/docs-model';
import { Docs } from '../docs/docs';


interface IScope {
    namespace: string,
    docs: Docs,
    model: DocsModel;
    fs: IFs;
}


function controller(
        $scope: IScope) {

    $scope.model = {
        paramsShown: {},
        implNotesShown: {},
    };
    $scope.fs = fs;

    //console.log($scope.docs)
}

function link($scope: any, ele: any, attrs: any) {

}

function directive() {
    return {
    	restrict: 'E',
    	scope: {
            // the attribute name is the same as the value you want to bind to 
            // inside the directive's scope so we can just use '=' below.
            docs: '=',
            namespace: '='
    	},
        link, 
        templateUrl: './src/elements/docs.html',
        controller
   	}
}


let elementDocs = angular
    .module('app.elements.docs', [])
    .directive('docDiv', directive)
    .name;

export { elementDocs }
*/