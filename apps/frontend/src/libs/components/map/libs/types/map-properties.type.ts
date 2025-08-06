import { type LngLatLike } from "mapbox-gl";

import { type LocationData } from "./location-data.type.js";
import { type Marker } from "./marker.type.js";

type MapProperties = {
	center?: LngLatLike;
	className?: string;
	markers?: Marker[];
	onLocationError?: (error: string) => void;
	onLocationFound?: (location: LocationData) => void;
	onMarkerClick?: (marker: Marker) => void;
};

export { type MapProperties };
