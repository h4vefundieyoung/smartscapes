import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

import { SCALE_CONTROL_DEFAULTS } from "./libs/constants/constants.js";
import { type ScaleControlProperties } from "./libs/types/types.js";

const ScaleControl = ({
	enabled = SCALE_CONTROL_DEFAULTS.ENABLED,
	isMapReady,
	mapInstance,
	maxWidth = SCALE_CONTROL_DEFAULTS.MAX_WIDTH,
	position = SCALE_CONTROL_DEFAULTS.POSITION,
	unit = SCALE_CONTROL_DEFAULTS.UNIT,
}: ScaleControlProperties): null => {
	const controlReference = useRef<mapboxgl.ScaleControl | null>(null);
	const isControlAddedReference = useRef<boolean>(false);

	useEffect(() => {
		if (!mapInstance || !isMapReady || !enabled) {
			return;
		}

		if (controlReference.current) {
			return;
		}

		const control = new mapboxgl.ScaleControl({
			maxWidth,
			unit,
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
	}, [mapInstance, isMapReady, enabled, position, unit, maxWidth]);

	return null;
};

export { ScaleControl };
