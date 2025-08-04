import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

import { MAP_CONTROL_DEFAULTS } from "./libs/constants/constants.js";
import { type MapControlProperties } from "./libs/types/types.js";

const MapControl = ({
	mapInstance,
	isMapReady,
	showZoom = MAP_CONTROL_DEFAULTS.SHOW_ZOOM,
	showCompass = MAP_CONTROL_DEFAULTS.SHOW_COMPASS,
	position = MAP_CONTROL_DEFAULTS.POSITION,
}: MapControlProperties): null => {
	const controlRef = useRef<mapboxgl.NavigationControl | null>(null);
	const isControlAddedRef = useRef<boolean>(false);

	useEffect(() => {
		if (!mapInstance || !isMapReady || (!showZoom && !showCompass)) return;

		if (controlRef.current) {
			return;
		}

		const control = new mapboxgl.NavigationControl({
			showCompass,
			showZoom,
		});

		controlRef.current = control;
		mapInstance.addControl(control, position);
		isControlAddedRef.current = true;

		return () => {
			const currentControl = controlRef.current;

			if (currentControl && mapInstance && isControlAddedRef.current) {
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
		};
	}, [mapInstance, isMapReady, showZoom, showCompass, position]);

	useEffect(() => {
		return () => {
			const currentControl = controlRef.current;

			if (currentControl && mapInstance && isControlAddedRef.current) {
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
		};
	}, []);

	return null;
};

export { MapControl };
