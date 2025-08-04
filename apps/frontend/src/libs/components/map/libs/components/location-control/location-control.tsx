import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

import { LOCATION_CONTROL_DEFAULTS } from "./libs/constants/constants.js";
import { type LocationControlProperties } from "./libs/types/types.js";

const TRIGGER_DELAY_MS = 500;

const LocationControl = ({
	autoTrigger = false,
	enabled = LOCATION_CONTROL_DEFAULTS.ENABLED,
	isMapReady,
	mapInstance,
	onLocationError,
	onLocationFound,
	position = LOCATION_CONTROL_DEFAULTS.POSITION,
	showAccuracyCircle = LOCATION_CONTROL_DEFAULTS.SHOW_ACCURACY_CIRCLE,
	showUserHeading = LOCATION_CONTROL_DEFAULTS.SHOW_USER_HEADING,
	trackUserLocation = LOCATION_CONTROL_DEFAULTS.TRACK_USER_LOCATION,
}: LocationControlProperties): null => {
	const controlReference = useRef<mapboxgl.GeolocateControl | null>(null);
	const handlerReference = useRef<
		((event: GeolocationPosition) => void) | null
	>(null);
	const errorHandlerReference = useRef<
		((error: GeolocationPositionError) => void) | null
	>(null);
	const isControlAddedReference = useRef<boolean>(false);

	useEffect(() => {
		if (!mapInstance || !isMapReady || !enabled) {
			return;
		}

		if (controlReference.current) {
			return;
		}

		const control = new mapboxgl.GeolocateControl({
			positionOptions: LOCATION_CONTROL_DEFAULTS.POSITION_OPTIONS,
			showAccuracyCircle,
			showUserHeading,
			trackUserLocation,
		});

		const handleGeolocate = (event: GeolocationPosition): void => {
			onLocationFound?.({
				latitude: event.coords.latitude,
				longitude: event.coords.longitude,
			});
		};

		const handleGeolocateError = (error: GeolocationPositionError): void => {
			onLocationError?.(error.message);
		};

		controlReference.current = control;
		handlerReference.current = handleGeolocate;
		errorHandlerReference.current = handleGeolocateError;

		control.on("geolocate", handleGeolocate);
		control.on("error", handleGeolocateError);
		mapInstance.addControl(control, position);
		isControlAddedReference.current = true;

		if (autoTrigger) {
			setTimeout((): void => {
				if (
					controlReference.current &&
					typeof controlReference.current.trigger === "function"
				) {
					controlReference.current.trigger();
				}
			}, TRIGGER_DELAY_MS);
		}

		return (): void => {
			const currentControl = controlReference.current;
			const currentHandler = handlerReference.current;
			const currentErrorHandler = errorHandlerReference.current;

			if (currentControl && currentHandler && isControlAddedReference.current) {
				currentControl.off("geolocate", currentHandler);

				if (currentErrorHandler) {
					currentControl.off("error", currentErrorHandler);
				}

				try {
					mapInstance.removeControl(currentControl);
					isControlAddedReference.current = false;
				} catch {
					isControlAddedReference.current = false;
				}
			}

			controlReference.current = null;
			handlerReference.current = null;
			errorHandlerReference.current = null;
		};
	}, [
		mapInstance,
		isMapReady,
		enabled,
		position,
		trackUserLocation,
		showUserHeading,
		showAccuracyCircle,
		autoTrigger,
		onLocationFound,
		onLocationError,
	]);

	return null;
};

export { LocationControl };
