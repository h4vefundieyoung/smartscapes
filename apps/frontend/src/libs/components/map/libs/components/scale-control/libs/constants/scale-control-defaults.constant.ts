import {
	type ControlPosition,
	type ScaleUnit,
} from "../../../../types/shared.type.js";

const SCALE_CONTROL_DEFAULTS = {
	ENABLED: true,
	MAX_WIDTH: 100,
	POSITION: "bottom-left" as ControlPosition,
	UNIT: "metric" as ScaleUnit,
} as const;

export { SCALE_CONTROL_DEFAULTS };
