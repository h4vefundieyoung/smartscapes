import {
	type ControlPosition,
	type GeolocateControlOptions,
	type MapOptions,
	type MarkerOptions,
	type NavigationControlOptions,
	type ScaleControlOptions,
} from "../types/types.js";

const CONTROL_IDS = {
	GEOLOCATE: "geolocate",
	NAVIGATION: "navigation",
	SCALE: "scale",
} as const;

const GEOLOCATE_AUTO_TRIGGER_DELAY = 100;

const DEFAULT_LONGITUDE = 30.5234;
const DEFAULT_LATITUDE = 50.4501;
const DEFAULT_MAP_OPTIONS: Omit<MapOptions, "container"> = {
	center: [DEFAULT_LONGITUDE, DEFAULT_LATITUDE],
	style: "mapbox://styles/mapbox/streets-v12",
	zoom: 12,
};

const DEFAULT_MAP_CONTROLS_POSITION: Record<string, ControlPosition> = {
	GEOLOCATE: "bottom-right",
	NAVIGATION: "top-right",
	SCALE: "bottom-left",
};

const DEFAULT_MARKER_OPTIONS: MarkerOptions = {
	color: "hsl(162deg 91% 25% / 100%)",
	coordinates: [DEFAULT_LONGITUDE, DEFAULT_LATITUDE],
	scale: 1,
};

const DEFAULT_NAVIGATION_CONTROL_OPTIONS: NavigationControlOptions = {
	showCompass: true,
	showZoom: true,
	visualizePitch: true,
};

const DEFAULT_SCALE_CONTROL_OPTIONS: ScaleControlOptions = {
	maxWidth: 80,
	unit: "metric",
};

const DEFAULT_GEOLOCATE_CONTROL_OPTIONS: GeolocateControlOptions = {
	autoTrigger: false,
	positionOptions: {
		enableHighAccuracy: true,
		maximumAge: 60_000,
		timeout: 15_000,
	},
	showAccuracyCircle: true,
	showUserHeading: true,
	trackUserLocation: true,
};

const DEFAULT_ZOOM_LEVEL = 12;

export {
	CONTROL_IDS,
	DEFAULT_GEOLOCATE_CONTROL_OPTIONS,
	DEFAULT_MAP_CONTROLS_POSITION,
	DEFAULT_MAP_OPTIONS,
	DEFAULT_MARKER_OPTIONS,
	DEFAULT_NAVIGATION_CONTROL_OPTIONS,
	DEFAULT_SCALE_CONTROL_OPTIONS,
	DEFAULT_ZOOM_LEVEL,
	GEOLOCATE_AUTO_TRIGGER_DELAY,
};
