import { type default as mapboxgl } from "mapbox-gl";

type MapboxGL = typeof mapboxgl;

export { type LocationData } from "./location-data.type.js";
export { type MapProperties } from "./map-properties.type.js";
export {
	type ControlPosition,
	type GeolocateControl,
	type LngLatLike,
	type Map as MapboxMap,
	type Marker as MapboxMarker,
	type NavigationControl,
	type ScaleControl,
	type ScaleControlOptions,
} from "mapbox-gl";
export { type MapboxGL };
