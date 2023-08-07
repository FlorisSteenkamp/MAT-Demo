
function getViewboxXY(
        svg$: SVGSVGElement,
        viewbox: number[][], 
        pixelsX: number, 
        pixelsY: number): number[] {

    let boundingRect = svg$.getBoundingClientRect(); 
    let pixelsW = boundingRect.width;
    let pixelsH = boundingRect.height;

    let viewboxW = viewbox[1][0] - viewbox[0][0];
    let viewboxH = viewbox[1][1] - viewbox[0][1];

    let viewboxX = ((pixelsX/pixelsW) * viewboxW) + viewbox[0][0];
    let viewboxY = ((pixelsY/pixelsH) * viewboxH) + viewbox[0][1];

    return [viewboxX, viewboxY];
}


export { getViewboxXY }
