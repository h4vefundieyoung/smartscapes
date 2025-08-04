import { type Map } from "mapbox-gl";

type BaseControlProperties = {
	isMapReady: boolean;
	mapInstance: Map | null;
	position?: ControlPosition;
};

type ControlPosition =
	| "bottom-left"
	| "bottom-right"
	| "top-left"
	| "top-right";

type LocationFoundEvent = {
	latitude: number;
	longitude: number;
};

type PositionOptions = {
	enableHighAccuracy?: boolean;
	maximumAge?: number;
	timeout?: number;
};

type ScaleUnit = "imperial" | "metric" | "nautical";

export {
	type BaseControlProperties,
	type ControlPosition,
	type LocationFoundEvent,
	type PositionOptions,
	type ScaleUnit,
};
