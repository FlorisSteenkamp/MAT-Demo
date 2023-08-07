import { StateControl } from "../../state-control/state-control.js";
import { getViewboxXY } from "../get-viewbox-xy.js";


function mouseUp(
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
        
        clickedForNewViewboxSecond(stateControl, viewboxXY);
    }
}


function clickedForNewViewboxSecond(
        stateControl: StateControl, 
        viewboxXY: number[]) {

    // Get info
    let { state, upd, transientState } = stateControl;
    let { pageState } = state.appState;
    let { viewbox } = pageState;
    let { zoomState } = transientState;
    let { prevViewboxXY } = zoomState;

    // Update transient info
    zoomState.mouseIsDown = false;
    if (zoomState.zoomRect) { zoomState.zoomRect.remove(); }

    // Swap if necessary
    if (viewboxXY[0] < prevViewboxXY[0]) {
        [viewboxXY[0], prevViewboxXY[0]] = [prevViewboxXY[0], viewboxXY[0]];
    }
    if (viewboxXY[1] < prevViewboxXY[1]) {
        [viewboxXY[1], prevViewboxXY[1]] = [prevViewboxXY[1], viewboxXY[1]];
    }

    let newViewbox = [prevViewboxXY, viewboxXY];

    let viewboxW = viewbox[1][0] - viewbox[0][0];
    let viewboxH = viewbox[1][1] - viewbox[0][1];
    let newViewboxW = viewboxXY[0] - prevViewboxXY[0];
    let newViewboxH = viewboxXY[1] - prevViewboxXY[1];

    let relWidth = newViewboxW / viewboxW;
    let relHeight = newViewboxH / viewboxH;

    if (relWidth < 0.01 || relHeight < 0.01) { return; }

    transientState.viewboxStack.push(viewbox);
    // pageState.viewboxStack.push(viewbox);
    upd(pageState, { viewbox: newViewbox });
}


export { mouseUp }
