import { GEOLOCATE_CONTROLS_PARAMETERS } from "../consts/consts.js";
import {
	type GeolocateControl,
	type LocationData,
	type MapboxGL,
} from "../types/types.js";

const createGeolocateControl = (mapClient: MapboxGL): GeolocateControl => {
	return new mapClient.GeolocateControl({
		positionOptions: {
			enableHighAccuracy:
				GEOLOCATE_CONTROLS_PARAMETERS.POSITION_OPTIONS.ENABLE_HIGH_ACCURACY,
			maximumAge: GEOLOCATE_CONTROLS_PARAMETERS.POSITION_OPTIONS.MAXIMUM_AGE,
			timeout: GEOLOCATE_CONTROLS_PARAMETERS.POSITION_OPTIONS.TIMEOUT,
		},
		showAccuracyCircle: GEOLOCATE_CONTROLS_PARAMETERS.SHOW_ACCURACY_CIRCLE,
		showUserHeading: GEOLOCATE_CONTROLS_PARAMETERS.SHOW_USER_HEADING,
		trackUserLocation: GEOLOCATE_CONTROLS_PARAMETERS.TRACK_USER_LOCATION,
	});
};

const setupGeolocateControlEvents = (
	geolocateControl: GeolocateControl,
	onLocationFound: (location: LocationData) => void,
	onLocationError?: (message: string) => void,
): void => {
	geolocateControl.on("geolocate", (event: GeolocationPosition) => {
		onLocationFound({
			latitude: event.coords.latitude,
			longitude: event.coords.longitude,
		});
	});

	geolocateControl.on("error", (error: GeolocationPositionError) => {
		onLocationError?.(error.message);
	});
};

export { createGeolocateControl, setupGeolocateControlEvents };
