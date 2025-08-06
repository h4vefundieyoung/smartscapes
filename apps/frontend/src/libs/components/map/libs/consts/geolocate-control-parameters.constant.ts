import { type ControlPosition } from "mapbox-gl";

const GEOLOCATE_CONTROLS_PARAMETERS = {
	POSITION: "bottom-right" as ControlPosition,
	POSITION_OPTIONS: { ENABLE_HIGH_ACCURACY: true },
	SHOW_ACCURACY_CIRCLE: true,
	SHOW_USER_HEADING: true,
	TRACK_USER_LOCATION: true,
};

export { GEOLOCATE_CONTROLS_PARAMETERS };
