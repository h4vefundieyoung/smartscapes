import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

import { SCALE_CONTROL_DEFAULTS } from "./libs/constants/constants.js";
import { type ScaleControlProperties } from "./libs/types/types.js";

const ScaleControl = ({
	mapInstance,
	isMapReady,
	enabled = SCALE_CONTROL_DEFAULTS.ENABLED,
	position = SCALE_CONTROL_DEFAULTS.POSITION,
	unit = SCALE_CONTROL_DEFAULTS.UNIT,
	maxWidth = SCALE_CONTROL_DEFAULTS.MAX_WIDTH,
}: ScaleControlProperties): null => {
	const controlRef = useRef<mapboxgl.ScaleControl | null>(null);
	const isControlAddedRef = useRef<boolean>(false);

	useEffect(() => {
		if (!mapInstance || !isMapReady || !enabled) return;

		if (controlRef.current) {
			return;
		}

		const control = new mapboxgl.ScaleControl({
			maxWidth,
			unit,
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
	}, [mapInstance, isMapReady, enabled, position, unit, maxWidth]);

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

export { ScaleControl };
