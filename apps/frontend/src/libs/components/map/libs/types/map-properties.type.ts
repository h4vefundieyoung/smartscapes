import { type Map } from "mapbox-gl";

import { type PointOfInterest } from "../components/poi-layer/libs/types/types.js";
import {
	type ControlPosition,
	type LocationFoundEvent,
	type ScaleUnit,
} from "./shared.type.js";

type MapProperties = {
	center?: [number, number] | undefined;
	className?: string;
	currentPosition?: [number, number] | null;
	currentPositionColor?: string;
	isLocationControl?: boolean;
	isMapControl?: boolean;
	isScaleControl?: boolean;
	isShowCompass?: boolean;
	isTrackUserLocation?: boolean;
	isZoomControl?: boolean;
	locationControlPosition?: ControlPosition;
	onLocationError?: (error: string) => void;
	onLocationFound?: (location: LocationFoundEvent) => void;
	onMapReady?: (map: Map) => void;
	onPoiClick?: (poi: PointOfInterest) => void;
	poisData?: PointOfInterest[];
	scaleControlPosition?: ControlPosition;
	scaleControlUnit?: ScaleUnit;
	style?: string;
	zoom?: number;
	zoomControlPosition?: ControlPosition;
};

export { type MapProperties };
