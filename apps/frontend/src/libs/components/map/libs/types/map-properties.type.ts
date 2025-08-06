import { type LngLatLike, type LocationData } from "./types.js";

type MapProperties = {
	center?: LngLatLike;
	className?: string;
	markers?: LngLatLike[];
	onLocationError?: (error: string) => void;
	onLocationFound?: (location: LocationData) => void;
	onMarkerClick?: (position: LngLatLike) => void;
};

export { type MapProperties };
