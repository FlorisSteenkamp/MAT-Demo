declare var _debug_: Debug;

import { Debug } from '../debug';
import * as React from 'react';
import { useRef, useEffect } from 'react';
import {
	Container, Slider, Typography, FormControl, InputLabel, MenuItem, Select,
	SelectChangeEvent, Box, Grid
} from '@mui/material';
import { ButtonGroup } from '../components/simple/simple-button-group';
import { StateControl } from '../state-control/state-control';
import { ToDraw } from '../state/to-draw';
import { Checkbox } from '../components/simple/simple-checkbox';
import { PageState, ClickFor } from '../state/page-state';
import { loadDeducedProps } from './load-deduced-props';
import { logSomeStuff } from './log/log-some-stuff';
import { toViewBoxStr } from './viewbox';
import { onClick } from './mouse/on-click';
import { toDrawKeyToText } from './to-draw-key-to-text';
import { mouseMove } from './mouse/mouse-move';
import { mouseDown } from './mouse/mouse-down';
import { mouseUp } from './mouse/mouse-up';
import { drawElements } from './draw-elems';
import { getGlyphNames, loadPath } from './load-path';


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


const getGlyphNames_ = await getGlyphNames();


function Page(props: Props) {
	// Props
	const { stateControl, pageState } = props;
    const { upd, transientState } = stateControl;
	const { $svgs } = transientState;
	const { toDraw, viewbox, deduced } = pageState;
	const { mats } = deduced;

	// Hooks
	const svgRef = useRef<SVGSVGElement>(null);
	const refX = useRef<HTMLSpanElement>(null);
	const refY = useRef<HTMLSpanElement>(null);

	// const [mats,setMats] = React.useState<Mat[]>([]);

	useEffect(function() { lazyLoadDeduced(false) }, []); // run only once

	function toDrawChanged(key: keyof ToDraw) {
		return (shouldDraw: boolean) => {
			upd(pageState.toDraw, { [key]: shouldDraw });
			drawElements(
				pageState.satScale,
				mats,
				stateControl.state.appState.pageState.toDraw,
				svgRef.current!, $svgs, viewbox
			);
		}
	}


	function onViewMatChanged(viewMat: boolean) {
		upd(pageState, { viewMat });
		lazyLoadDeduced(false);
	}

	function onSimplifyChanged(simplify: boolean) {
		upd(pageState, { simplify });
		lazyLoadDeduced(false);
	}

	function showDelayChanged(
			event: Event, value: number | number[], activeThumb: number) {

		upd(pageState, { showDelay: value as number });
	}

	function satScaleChanged(
			event: Event, value: number | number[], activeThumb: number) {
				
		let satScale = value as number;
		upd(pageState, { satScale });
		lazyLoadDeduced(false);
	}


	async function lazyLoadDeduced(changeViewbox: boolean) {
		const { pageState } = stateControl.state.appState;
		let { satScale, glyphName } = pageState;

		let { pathStr } = await loadPath(glyphName);

		let { mats, viewbox, timingAll } = 
			loadDeducedProps(stateControl, pathStr);

		upd(stateControl.state.appState.pageState.deduced, { pathStr, mats });

        if (typeof _debug_ !== 'undefined') { logSomeStuff(timingAll); }

		let elems$ = drawElements(
			satScale, mats, toDraw, svgRef.current!, $svgs, viewbox
		);

		upd(stateControl.state.appState.pageState, {
			...(changeViewbox ? { viewbox } : {})
		});
	}


	function onClickForChanged(key: ClickFor | 'spacer'): void {
		if (key === 'spacer') { return; }
		upd(pageState, { clickFor: key });
	}


	function vectorChanged(event: SelectChangeEvent<string>, child: React.ReactNode) {
		let vectorName = event.target.value;
		upd(pageState, { glyphName: vectorName });
		lazyLoadDeduced(true);
	}

	return <>
		<Container maxWidth="lg" style={{ height: 'calc(100%)', padding: '10px' }}>
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
					twoProng: { text: '2-prong' },
					threeProng: { text: '3-prong' },
					bezier: { text: 'bezier' },
					container: { text: 'container' },
					loopSimplified: { text: 'loop (simplified)' },
					loopset: { text: 'loop set' },
					cp: { text: 'cp' },
					curvature: { text: 'k'},
					branch: { text: 'branch' },
					curve: { text: 'curve' },
					matCurve: { text: 'mat-curve'},
					salience: { text: 'salience' },
				}}
				value={pageState.clickFor}
				onChanged={onClickForChanged}
			/>
			<Box style={{ marginTop: '10px', marginBottom: '10px' }}>
				<Checkbox checked={pageState.simplify} styles={showThreeProngChangedStyles} text="simplify" onChanged={onSimplifyChanged} />
				<Checkbox checked={pageState.viewMat} styles={showThreeProngChangedStyles} text="mat/sat" onChanged={onViewMatChanged} />
			</Box>
			<Grid container spacing={2}>
				<Grid size="auto">
					<FormControl variant="outlined" style={{ minWidth: '200px' }}>
					<InputLabel id="select-outlined-label">Shape</InputLabel>
					<Select
						labelId="select-outlined-label"
						id="select-outlined"
						value={pageState.glyphName}
						onChange={vectorChanged}
						label="Shape"
					>
						{getGlyphNames_.map(v => 
							<MenuItem key={v} value={v}>{v}</MenuItem>
						)}
					</Select>
					</FormControl>
				</Grid>
				<Grid size="auto" style={{ minWidth: '150px'}}>
					<Typography id="slider" gutterBottom>
						SAT Scale
					</Typography>
					<Slider
						value={pageState.satScale}
						aria-labelledby="slider"
						min={1} max={2.5} step={0.025}
						marks
						valueLabelDisplay="auto"
						onChange={satScaleChanged}
					/>
				</Grid>
				<Grid size="auto" style={{ minWidth: '150px'}}>
					<Typography id="slider" gutterBottom>
						Show delay
					</Typography>
					<Slider
						value={pageState.showDelay}
						aria-labelledby="slider"
						min={0} max={50_000} step={100}
						marks
						valueLabelDisplay="auto"
						onChange={showDelayChanged}
					/>
				</Grid>
			</Grid>
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
				onClick={onClick(stateControl, svgRef)}
			>
				<path 
					id="svg-path"
					className="shape"
					d={pageState.deduced.pathStr}
				/>
				<g />
			</svg>
        </Container>
    </>;
}


export { Page }
