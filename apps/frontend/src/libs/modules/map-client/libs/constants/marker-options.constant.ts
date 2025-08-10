import { type MarkerOptions } from "../types/types.js";
import { DEFAULT_COORDS } from "./default-coords.constant.js";

const MARKER_OPTIONS: MarkerOptions = {
	color: "var(--color-fill-brand-strong)",
	coordinates: [DEFAULT_COORDS.LONGITUDE, DEFAULT_COORDS.LATITUDE],
	id: "default",
	scale: 1,
};

export { MARKER_OPTIONS };
