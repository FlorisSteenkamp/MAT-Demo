/*
import { DocType, DocTypeType } from "../i-doc/doc-type";


/* The following functions were modified from TypeDoc source */

/*
function paramToStr(type: DocType): string {
    let TYPE_MAP: { [key in DocTypeType ]: (type: DocType) => string } = {
        'array'        : arrayTypeToStr,
        'intrinsic'    : intrinsicTypeToStr,
        'reference'    : referenceTypeToStr,
        'reflection'   : reflectionTypeToStr,
        'union'        : unionTypeToStr,
        'intersection' : intersectionTypeToStr,
    }

    let f = TYPE_MAP[type.type];
    let res = f ? f(type) : '?';

    //console.log(res)
    return res;
}


function referenceTypeToStr(type: DocType) {
    // TODO - not sure if this is quite right
    return type.name;
}


function intersectionTypeToStr(type: DocType) {
    // TODO - not sure if this is quite right
    return type.name;
}



function intrinsicTypeToStr(type: DocType) {
    return type.name;
}



function unionTypeToStr(type: DocType) {
    const names: string[] = [];

    type.types.forEach((elem) => {
        names.push(paramToStr(elem));
    });

    return names.join(' | ');
}



function reflectionTypeToStr(type: DocType) {
    if (!type.declaration.children && type.declaration.signatures) {
        return 'function';
    } else {
        return 'object';
    }
}


function arrayTypeToStr(type: DocType) {
    let elementType = type.elementType;
    const elementTypeStr = paramToStr(elementType);
    if (elementType.type === 'union' || elementType.type === 'intersection') {
        return '(' + elementTypeStr + ')[]';
    } else {
        return elementTypeStr + '[]';
    }
}


export { paramToStr }
*/