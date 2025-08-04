import { type Map } from "mapbox-gl";

type CurrentPositionProperties = {
	color?: string;
	isMapReady: boolean;
	mapInstance: Map | null;
	position?: [number, number] | null | undefined;
};

export { type CurrentPositionProperties };
