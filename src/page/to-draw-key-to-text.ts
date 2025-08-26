import { ToDraw } from "../state/to-draw"


const toDrawKeyToText: { [P in keyof ToDraw]?: string } = {
	//minY: "Topmosts",
	//bezier_: "(pre) bezier",
	//looseBoundingBox_: "(pre) Loose bbs",
	//tightBoundingBox_: "(pre) Tight bbs",
	//boundingHull_: "(pre) hulls",
	//container: "Containers",

	mat: "MAT",
	// sat: "SAT",
	speed: "Speed",

	looseBoundingBox: "Loose bbs",
	tightBoundingBox: "Tight bbs",
	// sharpCorner: "Sharp corners",
	// dullCorner: "Dull corners",

	boundingHull: "hulls",
	// oneProng: "1-prongs",
	// oneProngAtDullCorner: "1-prongs (dull corner)",
	// twoProng_regular: "2-prongs",
	// twoProng_holeClosing: "2-prongs (hole closing)",
	twoProng: "2-prongs",
	threeProng: "3-prongs",
	// maxVertex: "Max vertices",
	leaves: "Leaves",
	cull: "Culls",
	intersection: "Intersections",
	vertex: 'Vertices',
	branch: "branches",
	holeCloser: "Hole-closers",
}


export { toDrawKeyToText }
