import { getPathsFromStr, findMats } from 'flo-mat';
import { StateControl } from '../state-control/state-control.js';
import { getSatsFromGeneratedMats } from './get-sats-from-generated-mats.js';
import { vectors } from '../state/vectors.js';
import { updDebugGlobal } from './upd-debug-global.js';
import { getViewBoxForShape } from './viewbox.js';


const IS_DEBUG_ON = true;


async function loadPath(vectorName: string) {
    const vector = vectors.find(vector => vector.name === vectorName);
    const str = await (await fetch(vector.url)).text();

    // TODO stateControl could be stale here - prevent by showing loader

    // Find an SVG element within the given URL's HTML.
    const elem = createElemFromHtml(str);
    const svgElem = findFirstSvgFromElems(elem);

    // Put the found SVG elements child nodes into our SVG
    const svgContentElems = Array.from(svgElem.childNodes) as Node[];
    let pathStr: string;
    for (let svgContentElem of svgContentElems) {
        let pathElem = svgContentElem as SVGPathElement;
        if (pathElem.tagName === 'path') { 
            pathStr = pathElem.getAttribute('d');
            break; 
        }
    }

    return { pathStr };
}


async function loadDeducedProps(
        stateControl: StateControl,
        pathStr: string) {
        
    let bezierLoops = getPathsFromStr(pathStr);
    let viewbox = getViewBoxForShape(bezierLoops);
    let timingAll: number;
    let timeStart = performance.now();
    try {
        // Resets _debug_
        updDebugGlobal(stateControl, IS_DEBUG_ON);
        // let mats = findMats(bezierLoops, 0.4, 4);
        let mats = findMats(bezierLoops, 1, 5);
        stateControl.transientState.mats = mats;
        let satScale = stateControl.state.appState.pageState.satScale;
        getSatsFromGeneratedMats(mats, satScale);
    } catch (e) {
        console.log(e);
    } finally {
        timingAll = performance.now() - timeStart;
    }

    return { viewbox, timingAll };
}


function findFirstSvgFromElems(elems: NodeListOf<Node>) {
    for (let i=0; i<elems.length; i++) {
        let elem = elems[i] as SVGElement;
        if (elem.tagName === 'svg') {
            return elem;
        }
        if (typeof elem.getElementsByTagName === 'undefined') {
            continue;
        }
        let svgElems = elem.getElementsByTagName('svg');
        if (svgElems.length) {
            return svgElems[0];
        }
    }
}


function createElemFromHtml(str: string) {
    var template = document.createElement('template');
    str = str.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = str;

    return template.content.childNodes;
}


export { loadPath, loadDeducedProps }
