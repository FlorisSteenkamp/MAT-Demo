
declare var _debug_: Debug;

//import { Debug } from 'flo-mat';
import { Debug } from '../debug';


function logSomeStuff(timingAll: number) {

    function addToVertexCount(
            vertexCount: { [index: number]: number },
            n: number,
            i: number) {

        if (!vertexCount[n]) { vertexCount[n] = 0; } 
        vertexCount[n] += i;
    }

    let vertexCount: { [index: number]: number } = {};
    
    let generated = _debug_.generated;

    let elems = generated.elems;

    addToVertexCount(vertexCount, 1, generated.elems.oneProng.length);

    for (let i=0; i<elems.twoProng_regular.length; i++) {
        let nProng = elems.twoProng_regular[i];
        let n = nProng.cpNode.getProngCount();
        addToVertexCount(vertexCount, n, 1);
    }

    for (let i=0; i<elems.twoProng_holeClosing.length; i++) {
        let nProng = elems.twoProng_holeClosing[i];
        let n = nProng.cpNode.getProngCount();
        addToVertexCount(vertexCount, n, 1);
    }

    addToVertexCount(vertexCount, 3, generated.elems.threeProng.length);

    let timings = generated.timing;
    let timingsOther = timingAll - 
        timings.normalize -
        timings.simplifyPaths -
        timings.holeClosers -
        timings.oneAnd2Prongs -
        timings.threeProngs -
        timings.sats -
        timings.simplifyMat

    
    //for (let n in vertexCount) { console.log('# of '+n+'-prongs: ', vertexCount[n]); }
    //console.log(`    normalize paths    ${getTiming(timings.normalize)}`);
    console.log(`    simplify paths     ${getTiming(timings.simplifyPaths)}`);
    //console.log(`    hole-closers       ${getTiming(timings.holeClosers)}`);
    //console.log(`    1 & 2-prongs       ${getTiming(timings.oneAnd2Prongs)}`);
    //console.log(`    3-prongs           ${getTiming(timings.threeProngs)}`);
    //console.log(`    sats               ${getTiming(timings.sats)}`);
    //console.log(`    simplify mats      ${getTiming(timings.simplifyMat)}`);
    //console.log(`    other              ${getTiming(timingsOther)}`);
    
}


function getTiming(timing: number) {
    return ' took ' + timing.toFixed(0) + ' milliseconds.';
}


export { logSomeStuff }
