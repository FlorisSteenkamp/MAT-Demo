import { drawFs } from 'flo-draw';
import { drawElemFsDetailed, drawElemFs, Mat } from 'flo-mat';
import { getNearestTwoProng } from '../get-nearest/get-nearest-two-prong.js';


function logTwoProng(
        mats: Mat[],
        showSpokes?: boolean,
        showTrace?: boolean,
        showBoundaries?: boolean) {
            
    return (g: SVGGElement,
            p: number[],
            showDelay = 1000,
            scale = 1) => {
                
        const twoProng = getNearestTwoProng(mats, p).t;

        console.log(twoProng);

        drawElemFsDetailed.twoProng(g,twoProng,undefined,showDelay,scale)
    }
}


export { logTwoProng }
