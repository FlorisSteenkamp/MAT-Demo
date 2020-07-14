/*
import { JsonDocRaw } from "../i-doc/json-doc-raw";
import { JsonDoc } from "../i-doc/json-doc";
import { Docs } from "../docs";
import { DocClass } from "../i-doc/doc-class";
import { DocType } from "../i-doc/doc-type";
import { Tag } from "../i-doc/tag";


function removeSingleLineBreaks(s: string) {
	//The line below uses negative lookbehind and only works in ES2018+
	//return s.replace(/(?<!\n)\n(?!\n)/g, ' ');
	return (s.replace(/\n(?!\n)/g, ' ')).replace(/\n /g, '\n\n');
}

function remSingleLineBreaks(s: string) {
	//The line below uses negative lookbehind and only works in ES2018+
	//return s.replace(/(?<!\n)\n(?!\n)/g, ' ');
	return (s.replace(/\n(?!\n)/g, '')).replace(/\n /g, '\n\n');
}


function getDocCommentTagFromFirstSignature(doc: JsonDocRaw) {
    let sigs = doc.signatures || [];
    let sig = sigs[0] || {};
    let comment = sig.comment || {};
    let tags = comment.tags || [];
    let tags_ = tags.filter(tag => tag.tag === 'doc')
    let tag = tags_.length ? tags_[0] : undefined;

    return tag;
}


function getDocCommentTag(doc: JsonDocRaw) {
    let comment = doc.comment || {};
    let tags = comment.tags || [];
    let tags_ = tags.filter(tag => tag.tag === 'doc')
    let tag = tags_.length ? tags_[0] : undefined;

    return tag;
}


let rawToDocInfo: { 
        [index: string]: { 
            convert : ($sce: angular.ISCEService, docRaw: JsonDocRaw) => JsonDoc, 
            type    : 'functions' | 'classes',
            getTag  : (doc: JsonDocRaw) => Tag
        } 
    } = {
    
    'Function': { 
        convert: rawToFunctionDoc, 
        type: 'functions', 
        getTag: getDocCommentTagFromFirstSignature 
    },
    'Class': { 
        convert: rawToClassDoc, 
        type: 'classes',
        getTag: getDocCommentTag
    }
}


function parseDocs($sce: angular.ISCEService, docRaw: JsonDocRaw) {
    // We create our own namespaces for more control.
    //let namespacedDocs: { [index: string]: Docs } = {};
    let docs_ = new Docs();

    let docsRaw = docRaw.children;

    while (docsRaw.length) {
        let doc = docsRaw.pop();
        let toDocInfo = rawToDocInfo[doc.kindString];
        if (doc.children) { docsRaw.push(...doc.children); }

        if (!toDocInfo) { continue; }

        //let tag = toDocInfo.getTag(doc);
        //if (tag) {
            //let tagText = remSingleLineBreaks(tag.text); 

            let type = toDocInfo.type;
            docs_[type].push(toDocInfo.convert($sce, doc));
        //}
    }

    let f = (a: JsonDoc, b: JsonDoc) => a.name > b.name ? 1 : -1;
    docs_.functions.sort(f);
    docs_.classes.sort(f);

    return docs_;
}


function rawToFunctionDoc($sce: angular.ISCEService, docRaw: JsonDocRaw) {
    let comment = docRaw.signatures[0].comment || {};
    let tags = comment.tags || [];

    let signature = docRaw.signatures[0];

    let example: any; // 'any' due to angular's $sce not being typed
    if (tags.length) {
        for (let i=0; i<tags.length; i++) {
            let tag = tags[i];
            if (tag.tag === 'example') {
                example = $sce.trustAsHtml(tag.text.trim());
            }
        }
    } else {
        example = $sce.trustAsHtml('');
    }

    let description = comment.shortText
        ? removeSingleLineBreaks(comment.shortText)
        : '';

    let function_: JsonDoc = {
        name: docRaw.name,
        signature,
        comment,
        description,
        htmlDescription: $sce.trustAsHtml(description),
        tags,
        returns: {
            // Keep description empty - in functional programming the return 
            // value's description equals the function's description.
            description: '', 
            type: signature.type
        },
        parameters: signature.parameters.map(param => ({
            name: param.name,
            description: param.comment ? param.comment.text : '',
            htmlDescription: $sce.trustAsHtml(param.comment ? param.comment.text : ''),
            type: param.type
        })),
        example
    };

    return function_;
}


function rawToClassDoc($sce: angular.ISCEService, docRaw: JsonDocRaw) {
    let comment = docRaw.comment || {};

    let description = comment.shortText
        ? removeSingleLineBreaks(comment.shortText)
        : '';

    let properties: JsonDoc[] = [];
    let children = docRaw.children || []; 
    for (let child of children) {
        if (child.kindString === 'Property') {
            let comment = child.comment || {};
            let description = comment.shortText || '';
            let property = {
                name: child.name,
                description,
                htmlDescription: $sce.trustAsHtml(description)
            }
            properties.push(property);
        }
    }

    let class_: DocClass = {
        name: docRaw.name,
        comment,
        description,
        htmlDescription: $sce.trustAsHtml(description),
        properties
    };

    return class_;
}


/*
function parseDocs($sce: angular.ISCEService, docRaw: JsonDocRaw) {
    // We create our own namespaces for more control.
    let namespacedDocs: { [index: string]: Docs } = {};

    let docsRaw = docRaw.children;

    while (docsRaw.length) {
        let doc = docsRaw.pop();
        let toDocInfo = rawToDocInfo[doc.kindString];
        if (doc.children) { docsRaw.push(...doc.children); }

        if (!toDocInfo) { continue; }

        let tag = toDocInfo.getTag(doc);
        if (tag) {
            let tagText = remSingleLineBreaks(tag.text); 
            if (!namespacedDocs[tagText]) {
                namespacedDocs[tagText] = new Docs();
            }
            let nameSpace = namespacedDocs[tagText];

            let type = toDocInfo.type;
            nameSpace[type].push(toDocInfo.convert($sce, doc));
        }
    }

    for (let nameSpace in namespacedDocs) {
        let docs = namespacedDocs[nameSpace];

        let f = (a: JsonDoc, b: JsonDoc) => a.name > b.name ? 1 : -1;
        docs.functions.sort(f);
        docs.classes.sort(f);
    }

    return namespacedDocs;
}


function rawToFunctionDoc($sce: angular.ISCEService, docRaw: JsonDocRaw) {
    let comment = docRaw.signatures[0].comment || {};
    let tags = comment.tags || [];

    let signature = docRaw.signatures[0];

    let example: any; // 'any' due to angular's $sce not being typed
    if (tags.length) {
        for (let i=0; i<tags.length; i++) {
            let tag = tags[i];
            if (tag.tag === 'example') {
                example = $sce.trustAsHtml(tag.text.trim());
            }
        }
    } else {
        example = $sce.trustAsHtml('');
    }

    let description = comment.shortText
        ? removeSingleLineBreaks(comment.shortText)
        : '';

    let function_: JsonDoc = {
        name: docRaw.name,
        signature,
        comment,
        description,
        htmlDescription: $sce.trustAsHtml(description),
        tags,
        returns: {
            // Keep description empty - in functional programming the return 
            // value's description equals the function's description.
            description: '', 
            type: signature.type
        },
        parameters: signature.parameters.map(param => ({
            name: param.name,
            description: param.comment ? param.comment.text : '',
            htmlDescription: $sce.trustAsHtml(param.comment ? param.comment.text : ''),
            type: param.type
        })),
        example
    };

    return function_;
}


function rawToClassDoc($sce: angular.ISCEService, docRaw: JsonDocRaw) {
    let comment = docRaw.comment || {};

    let description = comment.shortText
        ? removeSingleLineBreaks(comment.shortText)
        : '';

    let properties: JsonDoc[] = [];
    let children = docRaw.children || []; 
    for (let child of children) {
        if (child.kindString === 'Property') {
            let comment = child.comment || {};
            let description = comment.shortText || '';
            let property = {
                name: child.name,
                description,
                htmlDescription: $sce.trustAsHtml(description)
            }
            properties.push(property);
        }
    }

    let class_: DocClass = {
        name: docRaw.name,
        comment,
        description,
        htmlDescription: $sce.trustAsHtml(description),
        properties
    };

    return class_;
}
*/

/**
 * Simplify the docs structure for our specific needs.
 */
/*
function parseDocs($sce: angular.ISCEService, docs: JsonDocRaw) {
    //console.log(docs);

    // The root is (and should not be) pushed.
    let fs_: JsonDocRaw[] = f(docs.children);

    //console.log(fs_);
    
    let fs: JsonDoc[] = [];
    for (let f_ of fs_) {
        let comment = f_.signatures[0].comment || {};
        let tags = comment.tags || [];

        let signature = f_.signatures[0];

        let example: any;
        if (tags.length) {
            for (let i=0; i<tags.length; i++) {
                let tag = tags[i];
                if (tag.tag === 'example') {
                    example = $sce.trustAsHtml(tag.text.trim());
                }
            }
        } else {
            example = $sce.trustAsHtml('');
        }

        let description = comment.shortText
            ? removeSingleLineBreaks(comment.shortText)
            : '';

        let f: JsonDoc = {
            name: f_.name,
            signature,
            comment,
            description,
            htmlDescription: $sce.trustAsHtml(description),
            tags,
            returns: {
                // Keep description empty - in functional programming the return 
                // value's description equals the function's description.
                description: '', 
                type: signature.type
            },
            parameters: signature.parameters.map(param => ({
                name: param.name,
                description: param.comment ? param.comment.text : '',
                htmlDescription: $sce.trustAsHtml(param.comment ? param.comment.text : ''),
                type: param.type
            })),
            example
        };

        fs.push(f);
    }

    fs.sort(function(a,b) { 
        return a.name > b.name ? 1 : -1;  
    });

    return fs;
}
*/


/*
function f(docs: JsonDocRaw[]) {
    let fs: JsonDocRaw[] = [];

    for (let doc of docs) {
        if (
            (doc.flags.isExported || doc.flags.isExternal) && 
            !doc.flags.isPrivate && 
            doc.kindString === 'Function') {

            fs.push(doc);
        }

        if (doc.children) {
            let fs_ = f(doc.children);
            fs.push(...fs_);
        }
    }

    return fs;
}
*//*


export { parseDocs }*/
