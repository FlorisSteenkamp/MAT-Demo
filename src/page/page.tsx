declare var _debug_: Debug;

import { Debug } from '../debug.js';
import * as React from 'react';
import { useRef, useEffect } from 'react';
import { IDebugElems } from 'flo-mat';
import { Container, Slider, Typography, FormControl, InputLabel, MenuItem, Select, Grid, SelectChangeEvent, Box } from '@mui/material';
import { ButtonGroup } from '../components/simple/simple-button-group.js';
import { StateControl } from '../state-control/state-control.js';
import { ToDraw } from '../state/to-draw.js';
import { deleteSvgs } from './delete-svgs.js';
import { getSatsFromGeneratedMats } from './get-sats-from-generated-mats.js';
import { Checkbox } from '../components/simple/simple-checkbox.js';
import { vectors } from '../state/vectors.js';
import { PageState, ClickFor } from '../state/page-state.js';
import { loadDeducedProps, loadPath } from './load-deduced-props.js';
import { logSomeStuff } from './log/log-some-stuff.js';
import { toViewBoxStr } from './viewbox.js';
import { onClick } from './mouse/on-click.js';
import { toDrawKeyToText } from './to-draw-key-to-text.js';
import { mouseMove } from './mouse/mouse-move.js';
import { mouseDown } from './mouse/mouse-down.js';
import { mouseUp } from './mouse/mouse-up.js';
import { drawElements } from './draw-elems.js';


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


interface Props {
	stateControl: StateControl;
	pageState: PageState;
}


function Page(props: Props) {
	// Props
	const { stateControl, pageState } = props;
    const { upd, transientState } = stateControl;
	const { $svgs } = transientState;
	const { toDraw, viewbox } = pageState;

	// Hooks
	const svgRef = useRef<SVGSVGElement>(null);
	const refX = useRef<HTMLSpanElement>(null);
	const refY = useRef<HTMLSpanElement>(null);
	useEffect(function() { lazyLoadDeduced(true) }, []); // run only once
	//const [{x,y}, setXY] = useState({x: 0, y: 0});
	
	
	function toDrawChanged(key: keyof ToDraw) {
		return (shouldDraw: boolean) => {
			upd(pageState.toDraw, { [key]: shouldDraw });
			drawElements(
				stateControl.state.appState.pageState.toDraw,
				svgRef.current, $svgs, viewbox
			);
		}
	}


	function showThreeProngChanged(key: string) {
		return (shouldShow: boolean) => {
			upd(pageState.threeProng, { [key]: shouldShow });
		}
	}


	function showDelayChanged(
			event: Event, value: number | number[], activeThumb: number) {

		upd(pageState, { showDelay: value as number });
	}

	function satScaleChanged(
			event: Event, value: number | number[], activeThumb: number) {
				
		let satScale = value as number;
		let mats = transientState.mats;
		if (!mats) { return; }
		getSatsFromGeneratedMats(mats, satScale);
		upd(pageState, { satScale });
		drawElements(toDraw, svgRef.current, $svgs, viewbox);
	}


	async function lazyLoadDeduced(changeViewbox: boolean) {
		let pageState: PageState;

		({ pageState } = stateControl.state.appState);
		let { vectorName } = pageState;

		let { pathStr } = await loadPath(vectorName);

		({ pageState } = stateControl.state.appState);
		upd(pageState.deduced, { path: pathStr });

		let { viewbox, timingAll } = await loadDeducedProps(stateControl, pathStr);

		console.log(`All took: ${timingAll.toFixed(0)} milliseconds.`);
		console.log(`number of 1-prongs: ${_debug_.generated.elems.oneProng.length}`);

        if (typeof _debug_ !== 'undefined') {
            logSomeStuff(timingAll);
        }

		let elems$ = drawElements(toDraw, svgRef.current, $svgs, viewbox);

		({ pageState } = stateControl.state.appState);

		if (changeViewbox) {
			upd(pageState, { 
				viewbox,
				deduced: {
					path: pathStr 
				}
			});
		} else {
			upd(pageState, { 
				// viewbox,
				deduced: {
					path: pathStr 
				}
			});
		}
	}


	function onClickForChanged(key: ClickFor | 'spacer'): void {
		if (key === 'spacer') { return; }
		upd(pageState, { clickFor: key });
	}


	//function vectorChanged(vectorName: string) {
	// function vectorChanged(event: SelectChangeEvent<{name?: string; value: string;}>, child: React.ReactNode) {
	function vectorChanged(event: SelectChangeEvent<string>, child: React.ReactNode) {
		let vectorName = event.target.value;
		upd(pageState, { vectorName });
		lazyLoadDeduced(true);
	}


	return <>
		<Container maxWidth="md" style={{ height: 'calc(100%)', padding: '10px' }}>
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
			<ButtonGroup<ClickFor>
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
				onChanged={onClickForChanged}
			/>
			{/* <label>Show clicked 3-prong</label> */}
			<Box style={{ marginTop: '10px', marginBottom: '10px' }}>
				<Checkbox checked={pageState.threeProng.spokes} styles={showThreeProngChangedStyles} text="spokes" onChanged={showThreeProngChanged('spokes')} />
				<Checkbox checked={pageState.threeProng.trace} styles={showThreeProngChangedStyles} text="trace" onChanged={showThreeProngChanged('trace')} />
				<Checkbox checked={pageState.threeProng.boundary} styles={showThreeProngChangedStyles} text="boundary" onChanged={showThreeProngChanged('boundary')} />
			</Box>
			<Grid container justifyContent="flex-start" spacing={2}>
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
						value={pageState.satScale}
						aria-labelledby="slider"
						min={1} max={5} step={0.1}
						marks
						valueLabelDisplay="auto"
						onChange={satScaleChanged}
					/>
				</Grid>
				<Grid item style={{ minWidth: '250px'}}>
					<Typography id="slider" gutterBottom>
						Show delay
					</Typography>
					<Slider
						value={pageState.showDelay}
						aria-labelledby="slider"
						min={0} max={5000} step={100}
						marks
						valueLabelDisplay="auto"
						onChange={showDelayChanged}
					/>
				</Grid>
			</Grid>
			{/*
			<span style={{ position: 'absolute', top: '8px', left: '230px' }}>
			<a href="./docs/index.html">
				docs
			</a>
			<span style={{ display: 'inline-block', width: '10px' }}></span>
			<a href="https://github.com/FlorisSteenkamp/MAT">
				GitHub
			</a>
			</span>
			*/}
			<span ref={refX} style={{ userSelect: 'none', position: 'fixed', bottom: '13px', left: '10px' }} />
			<span ref={refY} style={{ userSelect: 'none', position: 'fixed', bottom: '13px', left: '120px' }} />
			<svg 
				ref={svgRef}
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				id="svg"
				x="0px" 
				y="0px"
				viewBox={toViewBoxStr(viewbox)}
				style={{ width: '100%' }}
				onMouseDown={mouseDown(stateControl, svgRef, viewbox)}
				onMouseUp={mouseUp(stateControl, svgRef, viewbox)}
				onMouseMove={mouseMove(stateControl, svgRef, refX, refY)}
				onClick={onClick(stateControl, svgRef, viewbox)}
			>
				<path 
					id="svg-path"
					className="shape"
					d={pageState.deduced.path}
				/>
				<g />
			</svg>
        </Container>
    </>;
}


export { Page }
