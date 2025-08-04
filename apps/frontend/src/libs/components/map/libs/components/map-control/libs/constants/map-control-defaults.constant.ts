import { type ControlPosition } from "../../../../types/shared.type.js";

const MAP_CONTROL_DEFAULTS = {
	POSITION: "top-right" as ControlPosition,
	SHOW_COMPASS: true,
	SHOW_ZOOM: true,
} as const;

export { MAP_CONTROL_DEFAULTS };
