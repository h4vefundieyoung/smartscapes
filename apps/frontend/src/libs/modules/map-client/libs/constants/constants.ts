import mapboxgl from "mapbox-gl";
import { type ControlPosition } from "../types/types.js";

const CONTROL_IDS = {
	NAVIGATION: "navigation",
	SCALE: "scale",
	GEOLOCATE: "geolocate",
} as const;

const DEFAULT_MAP_OPTIONS: Omit<mapboxgl.MapOptions, "container"> = {
	center: [30.5234, 50.4501],
	style: "mapbox://styles/mapbox/streets-v12",
	zoom: 12,
};

const DEFAULT_MARKER_OPTIONS: mapboxgl.MarkerOptions = {
	color: "hsl(162deg 91% 25% / 100%)",
	scale: 1,
};

const DEFAULT_NAVIGATION_CONTROL_OPTIONS: mapboxgl.NavigationControlOptions & {
	position?: ControlPosition;
} = {
	showCompass: true,
	showZoom: true,
	visualizePitch: true,
	position: "top-right",
};

const DEFAULT_SCALE_CONTROL_OPTIONS: mapboxgl.ScaleControlOptions & {
	position?: ControlPosition;
} = {
	maxWidth: 80,
	unit: "metric",
	position: "bottom-left",
};

const DEFAULT_GEOLOCATE_CONTROL_OPTIONS: mapboxgl.GeolocateControlOptions & {
	position?: ControlPosition;
	autoTrigger?: boolean;
} = {
	positionOptions: {
		enableHighAccuracy: true,
		maximumAge: 60000,
		timeout: 15000,
	},
	showAccuracyCircle: true,
	showUserHeading: true,
	trackUserLocation: true,
	autoTrigger: false,
	position: "bottom-right",
};

export {
	CONTROL_IDS,
	DEFAULT_MAP_OPTIONS,
	DEFAULT_MARKER_OPTIONS,
	DEFAULT_NAVIGATION_CONTROL_OPTIONS,
	DEFAULT_SCALE_CONTROL_OPTIONS,
	DEFAULT_GEOLOCATE_CONTROL_OPTIONS,
};
