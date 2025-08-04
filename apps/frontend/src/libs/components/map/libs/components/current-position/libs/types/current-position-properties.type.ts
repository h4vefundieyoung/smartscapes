import type mapboxgl from "mapbox-gl";

type CurrentPositionProperties = {
	mapInstance: mapboxgl.Map | null;
	isMapReady: boolean;
	position?: [number, number] | null | undefined;
	color?: string;
};

export { type CurrentPositionProperties };
