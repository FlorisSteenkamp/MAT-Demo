import { ToDraw } from "../state/to-draw"


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


export { toDrawKeyToText }
