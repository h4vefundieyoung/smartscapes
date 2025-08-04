import type {
	ControlPosition,
	PositionOptions,
} from "../../../../types/shared.type.js";

const LOCATION_CONTROL_DEFAULTS = {
	ENABLED: true,
	POSITION: "top-left" as ControlPosition,
	SHOW_ACCURACY_CIRCLE: true,
	SHOW_USER_HEADING: true,
	TRACK_USER_LOCATION: true,
	POSITION_OPTIONS: {
		enableHighAccuracy: true,
		maximumAge: 60_000,
		timeout: 10_000,
	} as PositionOptions,
} as const;

export { LOCATION_CONTROL_DEFAULTS };
