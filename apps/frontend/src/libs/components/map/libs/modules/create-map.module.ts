import { MAP_PARAMETERS } from "../consts/consts.js";
import {
	type LngLatLike,
	type MapboxGL,
	type MapboxMap,
} from "../types/types.js";

const createMap = (
	mapClient: MapboxGL,
	container: HTMLDivElement,
	center?: LngLatLike,
): MapboxMap => {
	return new mapClient.Map({
		center: center || (MAP_PARAMETERS.DEFAULT_CENTER as LngLatLike),
		container,
		style: MAP_PARAMETERS.MAP_STYLE,
		zoom: MAP_PARAMETERS.DEFAULT_ZOOM,
	});
};

export { createMap };
