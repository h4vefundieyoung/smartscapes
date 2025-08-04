import mapboxgl from "mapbox-gl";
import {
	type ControlPosition,
	type LocationFoundEvent,
	type ScaleUnit,
} from "./shared.type.js";

type MapProperties = {
	className?: string;
	center?: [number, number] | undefined;
	zoom?: number;
	style?: string;
	currentPosition?: [number, number] | null;
	currentPositionColor?: string;
	isMapControl?: boolean;
	isZoomControl?: boolean;
	zoomControlPosition?: ControlPosition;
	isShowCompass?: boolean;
	isScaleControl?: boolean;
	scaleControlPosition?: ControlPosition;
	scaleControlUnit?: ScaleUnit;
	isLocationControl?: boolean;
	locationControlPosition?: ControlPosition;
	isTrackUserLocation?: boolean;
	onLocationFound?: (location: LocationFoundEvent) => void;
	onLocationError?: (error: string) => void;
	onMapReady?: (map: mapboxgl.Map) => void;
};

export { type MapProperties };
