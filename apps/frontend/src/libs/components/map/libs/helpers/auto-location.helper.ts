import { MAP_PARAMETERS } from "../consts/consts.js";
import {
	type GeolocateControl,
	type LngLatLike,
	type MapboxMap,
} from "../types/types.js";

const autoLocation = (
	geolocateControl: GeolocateControl,
	map: MapboxMap,
	center?: LngLatLike,
): void => {
	if (!center) {
		setTimeout(() => {
			if (typeof geolocateControl.trigger === "function") {
				geolocateControl.trigger();
			} else {
				map.flyTo({
					center: MAP_PARAMETERS.DEFAULT_CENTER as LngLatLike,
					zoom: MAP_PARAMETERS.DEFAULT_ZOOM,
				});
			}
		}, MAP_PARAMETERS.AUTO_TRIGGER_DELAY);
	}
};

export { autoLocation };
