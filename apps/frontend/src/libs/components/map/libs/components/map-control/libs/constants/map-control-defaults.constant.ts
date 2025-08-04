import type { ControlPosition } from "../../../../types/shared.type.js";

const MAP_CONTROL_DEFAULTS = {
	SHOW_ZOOM: true,
	SHOW_COMPASS: true,
	POSITION: "top-right" as ControlPosition,
} as const;

export { MAP_CONTROL_DEFAULTS };
