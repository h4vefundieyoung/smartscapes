import type mapboxgl from "mapbox-gl";

type ControlPosition =
	| "top-left"
	| "top-right"
	| "bottom-left"
	| "bottom-right";

type ScaleUnit = "metric" | "imperial" | "nautical";

type LocationFoundEvent = {
	latitude: number;
	longitude: number;
};

type PositionOptions = {
	enableHighAccuracy?: boolean;
	timeout?: number;
	maximumAge?: number;
};

type BaseControlProperties = {
	mapInstance: mapboxgl.Map | null;
	isMapReady: boolean;
	position?: ControlPosition;
};

export {
	type ControlPosition,
	type ScaleUnit,
	type LocationFoundEvent,
	type PositionOptions,
	type BaseControlProperties,
};
