import { type JSX } from "react";

import { type PointOfInterest } from "./point-of-interest.type.js";

type MapComponentProperties = {
	children?: never;
	className?: string;
	pois?: PointOfInterest[];
};

type MapComponentReturn = JSX.Element;

export { type MapComponentProperties, type MapComponentReturn };
export { type PointOfInterest } from "./point-of-interest.type.js";
