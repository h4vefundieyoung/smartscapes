import type {
	ControlPosition,
	ScaleUnit,
} from "../../../../types/shared.type.js";

const SCALE_CONTROL_DEFAULTS = {
	ENABLED: true,
	POSITION: "bottom-left" as ControlPosition,
	UNIT: "metric" as ScaleUnit,
	MAX_WIDTH: 100,
} as const;

export { SCALE_CONTROL_DEFAULTS };
