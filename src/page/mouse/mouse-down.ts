import { StateControl } from "../../state-control/state-control.js";
import { getViewboxXY } from "../get-viewbox-xy.js";


function mouseDown(
        stateControl: StateControl,
        svgRef: React.MutableRefObject<SVGSVGElement>,
        viewbox: number[][]) {

    return (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (event.shiftKey || event.ctrlKey || event.altKey) { return; }
        
        let svg$ = svgRef.current;
        if (!svg$) { return; }
        
        let ox = event.nativeEvent.offsetX;
        let oy = event.nativeEvent.offsetY;
        let viewboxXY = getViewboxXY(svg$, viewbox, ox, oy);
        
        clickedForNewViewboxFirst(stateControl, viewboxXY);
    }
}


function clickedForNewViewboxFirst(
        stateControl: StateControl, 
        viewboxXY: number[]) {

    let { transientState } = stateControl;
    let { zoomState } = transientState;

    // Just make sure previous rect is removed
    if (zoomState.zoomRect) { zoomState.zoomRect.remove(); }

    transientState.zoomState = { 
        mouseIsDown: true,
        prevViewboxXY: viewboxXY,
        zoomRect: undefined
    };
}


export { mouseDown }
