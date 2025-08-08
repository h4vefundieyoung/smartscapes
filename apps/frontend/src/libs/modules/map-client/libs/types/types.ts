import mapboxgl from "mapbox-gl";
import { type PointGeometry } from "@smartscapes/shared";

type Constructor = {
	token?: string;
};

type MapOptions = Omit<mapboxgl.MapOptions, "container">;

type MarkerOptions = {
	coordinates: PointGeometry["coordinates"];
	color?: string;
	scale?: number;
};

type ControlPosition = mapboxgl.ControlPosition;

type NavigationControlOptions = mapboxgl.NavigationControlOptions & {
	position?: ControlPosition;
};

type ScaleControlOptions = mapboxgl.ScaleControlOptions & {
	position?: ControlPosition;
};

type GeolocateControlOptions = mapboxgl.GeolocateControlOptions & {
	autoTrigger?: boolean;
	position?: ControlPosition;
};

export {
	type Constructor,
	type MapOptions,
	type MarkerOptions,
	type ControlPosition,
	type NavigationControlOptions,
	type ScaleControlOptions,
	type GeolocateControlOptions,
	type PointGeometry,
};
