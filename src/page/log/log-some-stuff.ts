declare var _debug_: Debug;

import { Debug } from '../../debug';
import { CpNodeFs } from 'flo-mat';
import { mapObj } from '../../utils/map-obj';

const { getProngCount } = CpNodeFs;


function logSomeStuff(timingAll: number) {
    // console.log(`All took: ${timingAll.toFixed(0)} milliseconds.`);
    
    function addToVertexCount(
            vertexCount: { [index: number]: number },
            n: number,
            i: number) {

        if (!vertexCount[n]) { vertexCount[n] = 0; } 
        vertexCount[n] += i;
    }

    const vertexCount: { [index: number]: number } = {};
    
    const { generated } = _debug_;
    const { elems, timing } = generated;
    const { simplifyPaths, oneAnd2Prongs, threeProngs, holeClosers, simplifyMat, sats, normalize } = timing;

    // console.log(`All took ${timingAll.toFixed(0)} milliseconds; simplify-paths: ${simplifyPaths.toFixed(0)}; 1&2-prongs: ${oneAnd2Prongs.toFixed(0)}; 3-prongs: ${threeProngs.toFixed(0)}; hole-closers: ${holeClosers.toFixed(0)}; simplify-mats: ${simplifyMat.toFixed(0)}; sats: ${sats.toFixed(0)}; normalize: ${normalize.toFixed(0)}`);
    console.log(`All took ${timingAll.toFixed(0)} milliseconds.`);
    console.log(mapObj<any>(v => Math.round(v), timing));

    // for (const i=0; i<elems.twoProng_regular.length; i++) {
    //     const nProng = elems.twoProng_regular[i];
    //     const n = getProngCount(nProng.cpNode);
    //     addToVertexCount(vertexCount, n, 1);
    // }

    // for (const i=0; i<elems.twoProng_holeClosing.length; i++) {
    //     const nProng = elems.twoProng_holeClosing[i];
    //     const n = getProngCount(nProng.cpNode);
    //     addToVertexCount(vertexCount, n, 1);
    // }

    // addToVertexCount(vertexCount, 3, generated.elems.threeProng.length);

    const timings = generated.timing;
    const timingsOther = timingAll - 
        timings.normalize -
        timings.simplifyPaths -
        timings.holeClosers -
        timings.oneAnd2Prongs -
        timings.threeProngs -
        timings.sats -
        timings.simplifyMat

    
    //for (const n in vertexCount) { console.log('# of '+n+'-prongs: ', vertexCount[n]); }
    // console.log(`    normalize paths    ${getTiming(timings.normalize)}`);
    // console.log(`    simplify paths     ${getTiming(timings.simplifyPaths)}`);
    // console.log(`    hole-closers       ${getTiming(timings.holeClosers)}`);
    // console.log(`    1 & 2-prongs       ${getTiming(timings.oneAnd2Prongs)}`);
    // console.log(`    3-prongs           ${getTiming(timings.threeProngs)}`);
    // console.log(`    sats               ${getTiming(timings.sats)}`);
    // console.log(`    simplify mats      ${getTiming(timings.simplifyMat)}`);
    // console.log(`    other              ${getTiming(timingsOther)}`);
}


function getTiming(timing: number) {
    return ' took ' + timing.toFixed(0) + ' milliseconds.';
}


export { logSomeStuff }
