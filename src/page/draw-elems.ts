declare var _debug_: Debug;

import type { Mat } from 'flo-mat';
import {
    CpNodeFs, drawBranch, drawElemFs, getBranches, getSatCulls, getHoleClosers,
    traverseVertices, isOneProng, isSharp, getRealProngCount
} from 'flo-mat';
import { getAllOnLoop } from '../../../mat/src/cp-node/fs/get-all-on-loop';
import { getLeaves } from '../../../mat/src/sat/get-leaves';
import { DualSet, DualSetFs } from '../../../mat/src/utils/dual-set';
import { Debug } from '../debug';
import { ToDraw } from "../state/to-draw";
import { deleteSvgs } from './delete-svgs';


const altClasses = [
    'thin10 blue nofill',
    'thin10 red nofill',
    'thin10 darkgreen nofill',
    'thin10 deeppink nofill',
    'thin10 brown nofill',
];


const colors = [
    '#E65100', '#33691E', '#01579B', '#4A148C', '#B71C1C',
    '#880E4F', '#1A237E', '#004D40',
    '#F57F17', '#3E2723'
].map(color => color + '33');


async function drawElements(
        satScale: number,
        mats: Mat[],
        toDraws: ToDraw,
        svg$: SVGElement,
        $svgs: { [T in keyof ToDraw]: SVGElement[][] },
        viewbox: number[][]) {

    if (typeof _debug_ === 'undefined') { return; }

    // const svg$ = svgRef.current;
    const g = svg$.getElementsByTagName('g')[0];

    const vbWidth = (viewbox[1][0] - viewbox[0][0]);

    let num2Prongs = 0;
    const elemss$: SVGElement[][][] = [];
    for (const elemType_ in toDraws) {
        const elemType = elemType_ as keyof ToDraw;

        const toDraw = toDraws[elemType];

        const $elems = $svgs[elemType] || [];
        deleteSvgs($elems);

        if (!toDraw) { continue; }

        for (const mat of mats) {
            if (elemType === 'holeCloser') {
                const holeClosers = getHoleClosers(mat.cpNode);
                for (const holeCloser of holeClosers) {
                    $elems.push(drawElemFs.holeCloser(
                        g, holeCloser, 'thin10 cyan nofill', 0, vbWidth/10)
                    );
                }
            }

            if (elemType === 'cull') {
                const cullSet = getSatCulls(mat.cpNode, satScale);
                const culls = Array.from(cullSet)
                .flatMap(s => Array.from(s[1])
                .map(r => [s[0],r]));

                for (const cull of culls) {
                    $elems.push(drawElemFs.cull(
                        g, cull, 'thin10 cyan nofill', 0, vbWidth/10)
                    );
                }
            }

            if (elemType === 'leaves') {
                const leaves = getLeaves(mat.cpNode);
                $elems.push(drawElemFs.leaves(g, leaves, undefined, 0, vbWidth/10));
            }

            // if (elemType === 'speed') {
            //     const cpNodes = getAllOnLoop(mat.cpNode);
            //     for (const cpNode of cpNodes) {
            //         $elems.push(drawElemFs.speed(g, cpNode, undefined, 0, vbWidth/10, 40));
            //     }
            // }

            if (elemType === 'mat') {
                $elems.push(drawElemFs.mat(g, mat, undefined, 0, vbWidth/10));
            }

            if (elemType === 'oneProng') {
                traverseVertices(mat.cpNode, cpNode => {
                    if (isOneProng(cpNode) && !isSharp(cpNode)) {
                        $elems.push(drawElemFs.oneProng(g, cpNode, undefined, 0, vbWidth/10))
                    }
                });
            }

            if (elemType === 'twoProng') {
                traverseVertices(mat.cpNode, cpNode => {
                    if (getRealProngCount(cpNode) === 2) {
                        $elems.push(drawElemFs.twoProng(g, cpNode, undefined, 0, vbWidth/10))
                        num2Prongs++;
                    }
                });
            }

            if (elemType === 'threeProng') {
                traverseVertices(mat.cpNode, cpNode => {
                    if (getRealProngCount(cpNode) >= 3) {
                        $elems.push(drawElemFs.threeProng(g, cpNode, undefined, 0, vbWidth/10))
                    }
                });
            }

            if (elemType === 'branch') {
                const branches = getBranches(mat.cpNode);
                let i = 0;
                for (const branch of branches) {
                    $elems.push(drawBranch(
                        g, branch,
                        altClasses[i%5],
                        0
                    ));
                    i++;
                }
            }

            if (elemType === 'looseBoundingBox') {
                const boxes = mat.meta.looseBoundingBoxes;
                for (const box of boxes) {
                    $elems.push(drawElemFs.looseBoundingBox(g, box, undefined, 0, vbWidth/10));
                }
            }

            if (elemType === 'tightBoundingBox') {
                const boxes = mat.meta.tightBoundingBoxes;
                for (const box of boxes) {
                    $elems.push(drawElemFs.tightBoundingBox(g, box, undefined, 0, vbWidth/10));
                }
            }

            if (elemType === 'vertex') {
                traverseVertices(mat.cpNode, cpNode => {
                    $elems.push(drawElemFs.vertex(g, cpNode, undefined, 0, vbWidth/10))
                });
            }
        }

        elemss$.push($elems);
    }

    // console.log(`# 2-prongs: ${num2Prongs}`);

    return elemss$;
}


export { drawElements }
