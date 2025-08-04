import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

import { LOCATION_CONTROL_DEFAULTS } from "./libs/constants/constants.js";
import { type LocationControlProperties } from "./libs/types/types.js";

const LocationControl = ({
	mapInstance,
	isMapReady,
	enabled = LOCATION_CONTROL_DEFAULTS.ENABLED,
	position = LOCATION_CONTROL_DEFAULTS.POSITION,
	onLocationFound,
	onLocationError,
	trackUserLocation = LOCATION_CONTROL_DEFAULTS.TRACK_USER_LOCATION,
	showUserHeading = LOCATION_CONTROL_DEFAULTS.SHOW_USER_HEADING,
	showAccuracyCircle = LOCATION_CONTROL_DEFAULTS.SHOW_ACCURACY_CIRCLE,
	autoTrigger = false,
}: LocationControlProperties): null => {
	const controlRef = useRef<mapboxgl.GeolocateControl | null>(null);
	const handlerRef = useRef<((event: GeolocationPosition) => void) | null>(
		null,
	);
	const errorHandlerRef = useRef<
		((error: GeolocationPositionError) => void) | null
	>(null);
	const isControlAddedRef = useRef<boolean>(false);

	useEffect(() => {
		if (!mapInstance || !isMapReady || !enabled) {
			return;
		}

		if (controlRef.current) {
			return;
		}

		const control = new mapboxgl.GeolocateControl({
			positionOptions: LOCATION_CONTROL_DEFAULTS.POSITION_OPTIONS,
			trackUserLocation,
			showUserHeading,
			showAccuracyCircle,
		});

		const handleGeolocate = (event: GeolocationPosition) => {
			onLocationFound?.({
				latitude: event.coords.latitude,
				longitude: event.coords.longitude,
			});
		};

		const handleGeolocateError = (error: GeolocationPositionError) => {
			onLocationError?.(error.message);
		};

		controlRef.current = control;
		handlerRef.current = handleGeolocate;
		errorHandlerRef.current = handleGeolocateError;

		control.on("geolocate", handleGeolocate);
		control.on("error", handleGeolocateError);
		mapInstance.addControl(control, position);
		isControlAddedRef.current = true;

		if (autoTrigger) {
			setTimeout(() => {
				if (
					controlRef.current &&
					typeof controlRef.current.trigger === "function"
				) {
					controlRef.current.trigger();
				}
			}, 500);
		}

		return () => {
			const currentControl = controlRef.current;
			const currentHandler = handlerRef.current;
			const currentErrorHandler = errorHandlerRef.current;

			if (currentControl && currentHandler && isControlAddedRef.current) {
				if (typeof currentControl.off === "function") {
					currentControl.off("geolocate", currentHandler);
					if (currentErrorHandler) {
						currentControl.off("error", currentErrorHandler);
					}
				}

				if (mapInstance && typeof mapInstance.removeControl === "function") {
					try {
						mapInstance.removeControl(currentControl);
						isControlAddedRef.current = false;
					} catch {
						isControlAddedRef.current = false;
					}
				}
			}

			controlRef.current = null;
			handlerRef.current = null;
			errorHandlerRef.current = null;
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

	useEffect(() => {
		return () => {
			const currentControl = controlRef.current;
			const currentHandler = handlerRef.current;
			const currentErrorHandler = errorHandlerRef.current;

			if (
				currentControl &&
				currentHandler &&
				mapInstance &&
				isControlAddedRef.current
			) {
				if (typeof currentControl.off === "function") {
					currentControl.off("geolocate", currentHandler);
					if (currentErrorHandler) {
						currentControl.off("error", currentErrorHandler);
					}
				}

				if (typeof mapInstance.removeControl === "function") {
					try {
						mapInstance.removeControl(currentControl);
						isControlAddedRef.current = false;
					} catch {
						isControlAddedRef.current = false;
					}
				}
			}

			controlRef.current = null;
			handlerRef.current = null;
			errorHandlerRef.current = null;
		};
	}, []);

	return null;
};

export { LocationControl };
