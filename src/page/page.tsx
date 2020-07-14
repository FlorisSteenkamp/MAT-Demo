
declare var _debug_: Debug;

import * as React from 'react';
import { memo, useRef, useEffect } from 'react';
import { Container, Slider, Typography, FormControl, InputLabel, MenuItem, Select, Grid } from '@material-ui/core';
import { StateControl } from '../state-control/state-control';
import { useStyles } from './styles';
import { IDebugElems } from 'flo-mat';
import { Debug } from '../debug';
import { ToDraw } from '../state/to-draw';
import { deleteSvgs } from './delete-svgs';
import { getSatsFromGeneratedMats } from './get-sats-from-generated-mats';
import { Checkbox } from '../components/simple/simple-checkbox';
//import { Select } from '../components/simple/simple-select-from-arr';
import { vectors } from '../state/vectors';
import { ValueSelect } from '../components/simple/value-select';
import { PageState } from '../state/page-state';
import { loadDeducedProps, loadPath } from './load-deduced-props';
import { logSomeStuff } from './log-some-stuff';
import { logNearestBezier } from './log-nearest-bezier';
import { getViewBoxForShape, toViewBoxStr } from './viewbox';
import { pointCpClicked } from './point-cp-clicked';
import { logNearestLoopSet } from './log-nearest-loop-set';
import { logNearestLoopSimplified } from './log-nearest-loop-simplified';
import { logNearestContainer } from './log-nearest-container';
import { logBezier_, logLooseBb_, logTightBb_, logBHull_ } from './log-bbs';


const toDrawCheckboxStyles = { 
	div: {
		display: 'inline-block', 
		marginBottom: '5px', 
		fontWeight: 400,
		width: '200px'
	}
}


const showThreeProngChangedStyles = { 
	...toDrawCheckboxStyles, 
	div: { 
		...toDrawCheckboxStyles.div, 
		width: '150px' 
	}
}


const vectorSelectStyles = {
	select: {
		padding: '3px 6px 3px 6px', 
		height: '28px', 
		backgroundColor: 'pink' 
	}
}


interface Props {
	stateControl: StateControl;
	pageState: PageState;
}


const toDrawKeyToText: { [P in keyof ToDraw]?: string } = {
	//minY: "Topmosts",
	//bezier_: "(pre) bezier",
	//looseBoundingBox_: "(pre) Loose bbs",
	//tightBoundingBox_: "(pre) Tight bbs",
	//boundingHull_: "(pre) hulls",
	mat: "MAT",
	sat: "SAT",
	looseBoundingBox: "Loose bbs",
	tightBoundingBox: "Tight bbs",
	boundingHull: "hulls",
	sharpCorner: "Sharp corners",
	dullCorner: "Dull corners",
	oneProng: "1-prongs",
	oneProngAtDullCorner: "1-prongs (dull corner)",
	twoProng_regular: "2-prongs",
	twoProng_holeClosing: "2-prongs (hole closing)",
	threeProng: "3-prongs",
	//container: "Containers",
	maxVertex: "Max vertices",
	leaves: "Leaves",
	culls: "Culls",
	intersection: "Intersections"
}


function Page(props: Props) {
	// Props
	const { stateControl, pageState } = props;
    const { state, upd, upd$, transientState } = stateControl;
    const { appState } = state;
	const { $svgs } = transientState;
	const { toDraw } = pageState;

	// Hooks
	const classes = useStyles();
	const ref = useRef<SVGSVGElement>(null);
	const refX = useRef<HTMLSpanElement>(null);
	const refY = useRef<HTMLSpanElement>(null);
	useEffect(function() { lazyLoadDeduced() }, []); // run only once
	//const [{x,y}, setXY] = useState({x: 0, y: 0});
	
	
	function mouseMove(event: React.MouseEvent<SVGSVGElement, MouseEvent>) {
		let svg$ = ref.current;
		if (!svg$) { return; }

		let { state, transientState } = stateControl;
		let { pageState } = state.appState;
		let { zoomState } = transientState;

		if (!zoomState.mouseIsDown) { return; }

		// Pixel coordinates
		let pixelsX = event.nativeEvent.offsetX;
		let pixelsY = event.nativeEvent.offsetY;
		
		let [viewboxX,viewboxY] = 
			getViewboxXY(svg$, pageState.viewbox, pixelsX, pixelsY);

		let spanX = refX.current;
		if (spanX) { spanX.innerHTML = viewboxX.toFixed(2); }
		let spanY = refY.current;
		if (spanY) { spanY.innerHTML = viewboxY.toFixed(2); }
	
		if (zoomState.zoomRect) { zoomState.zoomRect.remove(); }
		let prevViewboxXY = zoomState.prevViewboxXY;

		let newZoomRect = [
			prevViewboxXY, 
			[viewboxX, viewboxY]
		];

		let g$ = svg$.getElementsByTagName('g')[0];
		zoomState.zoomRect = drawRect(g$, newZoomRect);

		//setXY({x,y});
	}


	function mouseDown(event: React.MouseEvent<SVGSVGElement, MouseEvent>) {
		if (event.shiftKey || event.ctrlKey || event.altKey) { return; }
		
		let svg$ = ref.current;
		if (!svg$) { return; }
		
		let ox = event.nativeEvent.offsetX;
		let oy = event.nativeEvent.offsetY;
		let viewboxXY = getViewboxXY(svg$, pageState.viewbox, ox, oy);
		
		clickedForNewViewboxFirst(stateControl, viewboxXY);
	}


	function mouseUp(event: React.MouseEvent<SVGSVGElement, MouseEvent>) {
		if (event.shiftKey || event.ctrlKey || event.altKey) { return; }

		let svg$ = ref.current;
		if (!svg$) { return; }

		let ox = event.nativeEvent.offsetX;
		let oy = event.nativeEvent.offsetY;
		let viewboxXY = getViewboxXY(svg$, pageState.viewbox, ox, oy);
		
		clickedForNewViewboxSecond(stateControl, viewboxXY);
	}


	function onClick(event: React.MouseEvent<SVGSVGElement, MouseEvent>) {
		if (event.shiftKey) { 
			gotoPrevViewbox(stateControl); 
			return;
		}
		
        let { state, transientState } = stateControl;
        let { pageState } = state.appState;
		let svg$ = ref.current;
		if (!svg$) { return; }
		let g = svg$.getElementsByTagName('g')[0];

        // Pixel coordinates
        let ox = event.nativeEvent.offsetX;
        let oy = event.nativeEvent.offsetY;

		// SVG actual coordinates
		let viewboxXY = getViewboxXY(svg$, pageState.viewbox, ox, oy);

        let logNearestThreeProng = _debug_.fs.threeProng.logNearest(
            pageState.threeProng.spokes,
		    pageState.threeProng.trace,
		    pageState.threeProng.boundary
        );

        let fs: { [key: string]: (g: SVGElement, p: number[], delay: number) => void } = {
            bezier_           : logBezier_,
            looseBoundingBox_ : logLooseBb_,
            tightBoundingBox_ : logTightBb_,
            boundingHull_     : logBHull_,
            twoProng          : _debug_.fs.twoProng.logNearest,
            threeProng        : logNearestThreeProng,
            bezier            : logNearestBezier,
            loopSimplified    : logNearestLoopSimplified,
            loopset           : logNearestLoopSet,
            cp                : pointCpClicked(stateControl),
            container         : logNearestContainer,
        }
        
		//let { clickFor, showDelay } = pageState;
		//fs[clickFor](g, [x,y], showDelay);
    }
	

	function toDrawChanged(key: keyof ToDraw) {
		return (shouldDraw: boolean) => {
			upd(pageState.toDraw, { [key]: shouldDraw });
			drawElements(stateControl.state.appState.pageState.toDraw)
		}
	}


	//function showThreeProngChanged(key: string) {
	//	return (shouldShow: boolean) => {
	//		upd(pageState.threeProng, { [key]: shouldShow });
	//	}
	//}


	//function showDelayChanged(value: number) {
	//	upd(pageState, { showDelay: value });
	//}


	function satScaleChanged(event: React.ChangeEvent<{}>, value: number | number[]) {
		let satScale = value as number;
		let mats = transientState.mats;
		if (!mats) { return; }
		getSatsFromGeneratedMats(mats, satScale);
		upd(pageState, { satScale });
		drawElements(toDraw);
	}


	function drawElements(toDraws: ToDraw) {
        if (typeof _debug_ === 'undefined') { return; }

		let svg$ = ref.current;
		let g = svg$.getElementsByTagName('g')[0];

		let elemss$: SVGElement[][][] = [];
        for (let elemType_ in toDraws) {
            let elemType = elemType_ as keyof IDebugElems;
            let toDraw = toDraws[elemType];

            let $elems = $svgs[elemType];
            deleteSvgs($elems);
     
            if (!toDraw) { continue; }

			let generated = _debug_.generated;
            
            for (let elem of generated.elems[elemType]) {
                let drawElem = _debug_.fs.drawElem[elemType] as (g: SVGGElement, elem: any) => SVGElement[];
                $elems.push(drawElem(g, elem));
			}
			
			elemss$.push($elems);
		}
		
		return elemss$;
	}


	async function lazyLoadDeduced() {
		let pageState: PageState;

		({ pageState } = stateControl.state.appState);
		let { vectorName } = pageState;

		let { pathStr } = await loadPath(vectorName);

		({ pageState } = stateControl.state.appState);
		upd(pageState.deduced, { path: pathStr });

		let { viewbox, timingAll } = await loadDeducedProps(stateControl, pathStr);

		console.log(`All took: ${timingAll.toFixed(0)} milliseconds.`);

        if (typeof _debug_ !== 'undefined') {
            logSomeStuff(timingAll);
        }

		let elems$ = drawElements(toDraw);

		({ pageState } = stateControl.state.appState);

		upd(pageState, { 
			viewbox,
			deduced: {
				path: pathStr 
			}
		});
	}


	//function vectorChanged(vectorName: string) {
	function vectorChanged(event: React.ChangeEvent<{name?: string; value: string;}>, child: React.ReactNode) {
		let vectorName = event.target.value;
		upd(pageState, { vectorName });
		lazyLoadDeduced();
	}


	return (<>
        <Container maxWidth="md" className={classes.container}>
			{Object
			.keys(toDraw)
			.filter(key => !!toDrawKeyToText[key as keyof ToDraw])
			.map(_key => {
				let key = _key as keyof ToDraw;
				return (
					<Checkbox 
						key={key}
						checked={toDraw[key]} 
						styles={toDrawCheckboxStyles}
						text={toDrawKeyToText[key] as string}
						onChanged={toDrawChanged(key)} 
					/>
				);
			})}
			<hr style={{ 
				display: 'block',  height: '1px', 
    			border: '0',  borderTop: '1px solid #ccc', 
    			margin: '1em 0', padding: 0, color: '#eee' }} />
			{/*
			<label>Click</label>
			<ButtonGroup<typeof pageState.clickFor>
				options={{
					//bezier_: { text: '(pre) bezier' },
					//looseBoundingBox_: { text: '(pre) lbb' },
					//tightBoundingBox_: { text: '(pre) tbb' },
					//boundingHull_: { text: '(pre) bh' },
					twoProng: { text: '2-prong' },
					threeProng: { text: '3-prong' },
					bezier: { text: 'bezier' },
					container: { text: 'container' },
					loopSimplified: { text: 'loop (simplified)' },
					loopset: { text: 'loop set' },
					cp: { text: 'cp' },
				}}
				value={pageState.clickFor}
			/>
			<ValueSelect
				label="Show delay"
				styles={{}}
				value={pageState.showDelay}
				min={0}
				step={250}
				onChanged={showDelayChanged}
			/>
			*/}
			{/*}
			<Select
				styles={vectorSelectStyles}
				onChanged={vectorChanged}
				value={pageState.vectorName}
				options={vectors.map(obj => ({ key: obj.name, text: obj.name }))}
			/>
			*/}
			<Grid container justify="flex-start" spacing={5}>
				<Grid item>
					<FormControl variant="outlined" style={{ minWidth: '200px' }}>
					<InputLabel id="select-outlined-label">Shape</InputLabel>
					<Select
						labelId="select-outlined-label"
						id="select-outlined"
						value={pageState.vectorName}
						onChange={vectorChanged}
						label="Shape"
					>
						{vectors.map(v => 
							<MenuItem key={v.name} value={v.name}>{v.name}</MenuItem>
						)}
					</Select>
					</FormControl>
				</Grid>
				<Grid item style={{ minWidth: '250px'}}>
					<Typography id="slider" gutterBottom>
						SAT Scale
					</Typography>
					<Slider
						//defaultValue={80}
						//getAriaValueText={valuetext}
						value={pageState.satScale}
						aria-labelledby="slider"
						min={1}
						max={5}
						step={0.1}
						//marks={marks}
						marks
						valueLabelDisplay="auto"
						onChange={satScaleChanged}
					/>
				</Grid>
			</Grid>
			{/*
			<ValueSelect
				label="Sat scale"
				styles={{ div: { paddingLeft: '20px' }}}
				value={pageState.satScale}
				min={1}
				step={0.05}
				onChanged={satScaleChanged}
			/>
			*/}
			{/*
			<label>Show clicked 3-prong</label>
			<Checkbox checked={pageState.threeProng.spokes} styles={showThreeProngChangedStyles} text="spokes" onChanged={showThreeProngChanged('spokes')} />
			<Checkbox checked={pageState.threeProng.trace} styles={showThreeProngChangedStyles} text="trace" onChanged={showThreeProngChanged('trace')} />
			<Checkbox checked={pageState.threeProng.boundary} styles={showThreeProngChangedStyles} text="boundary" onChanged={showThreeProngChanged('boundary')} />
			*/}
			{/*
			<span style="position:absolute;top:8px;left:230px">
			<a href="./docs/index.html">
				docs
			</a>
			<span style="display:inline-block; width: 10px"></span>
			<a href="https://github.com/FlorisSteenkamp/MAT">
				GitHub
			</a>
			</span>
			*/}
			<span ref={refX} style={{ userSelect: 'none', position: 'absolute', bottom: '13px', left: '10px' }}>
				{/*{x.toFixed(2)}*/}
			</span>
			<span ref={refY} style={{ userSelect: 'none', position: 'absolute', bottom: '13px', left: '80px' }}>
				{/*{y.toFixed(2)}*/}
			</span>
			<svg 
				ref={ref}
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				id="svg"
				x="0px" 
				y="0px"
				viewBox={toViewBoxStr(pageState.viewbox)}
				style={{ width: '100%' }}
				onMouseDown={mouseDown}
				onMouseUp={mouseUp}
				onMouseMove={mouseMove}
				onClick={onClick}
			>
				<path 
					id="svg-path"
					className="shape"
					d={pageState.deduced.path}
				/>
				<g />
			</svg>
        </Container>
    </>);
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
	upd(pageState, { viewbox: newViewbox });
}


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


function drawRect(g: SVGGElement, rect: number[][]) {
	const XMLNS = 'http://www.w3.org/2000/svg';

	let [[x0,y0],[x1,y1]] = rect;
    let x = x0 < x1 ? x0 : x1;
    let y = y0 < y1 ? y0 : y1;
    let width = Math.abs(x0-x1);
    let height = Math.abs(y0-y1);

    let $rect = document.createElementNS(XMLNS, 'rect');
    $rect.setAttributeNS(null, "x", x.toString());
    $rect.setAttributeNS(null, "y", y.toString());
    $rect.setAttributeNS(null, "width",  width.toString());
    $rect.setAttributeNS(null, "height", height.toString());
    $rect.setAttributeNS(null, "class", 'zoomrect');

    g.appendChild($rect);

	return $rect;
}


function gotoPrevViewbox(stateControl: StateControl) {
    let { transientState, state, upd } = stateControl;
    let { pageState } = state.appState;
    let viewbox = transientState.viewboxStack.pop();
    if (!viewbox) {
        let loops = _debug_.generated.elems.loop;
        let bezierLoops = loops.map(loop => loop.beziers);
        viewbox = getViewBoxForShape(bezierLoops);
    }

    upd(pageState, { viewbox });
}


export { Page }
