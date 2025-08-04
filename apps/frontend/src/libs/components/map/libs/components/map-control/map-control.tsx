import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

import { MAP_CONTROL_DEFAULTS } from "./libs/constants/constants.js";
import { type MapControlProperties } from "./libs/types/types.js";

const MapControl = ({
	isMapReady,
	mapInstance,
	position = MAP_CONTROL_DEFAULTS.POSITION,
	showCompass = MAP_CONTROL_DEFAULTS.SHOW_COMPASS,
	showZoom = MAP_CONTROL_DEFAULTS.SHOW_ZOOM,
}: MapControlProperties): null => {
	const controlReference = useRef<mapboxgl.NavigationControl | null>(null);
	const isControlAddedReference = useRef<boolean>(false);

	useEffect(() => {
		if (!mapInstance || !isMapReady || (!showZoom && !showCompass)) {
			return;
		}

		if (controlReference.current) {
			return;
		}

		const control = new mapboxgl.NavigationControl({
			showCompass,
			showZoom,
		});

		controlReference.current = control;
		mapInstance.addControl(control, position);
		isControlAddedReference.current = true;

		return (): void => {
			const currentControl = controlReference.current;

			if (currentControl && isControlAddedReference.current) {
				try {
					mapInstance.removeControl(currentControl);
					isControlAddedReference.current = false;
				} catch {
					isControlAddedReference.current = false;
				}
			}

			controlReference.current = null;
		};
	}, [mapInstance, isMapReady, showZoom, showCompass, position]);

	return null;
};

export { MapControl };
