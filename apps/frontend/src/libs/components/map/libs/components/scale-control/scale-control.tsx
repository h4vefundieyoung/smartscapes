import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

import { useMapContext } from "../../context/context.js";
import {
	type ScaleControlProperties,
	type ScaleControlReturn,
} from "./types.js";

const ScaleControl = ({
	position = "bottom-left",
	maxWidth = 100,
	unit = "metric",
}: ScaleControlProperties): ScaleControlReturn => {
	const { map } = useMapContext();
	const controlRef = useRef<mapboxgl.ScaleControl | null>(null);

	useEffect((): (() => void) | undefined => {
		if (!map) {
			return;
		}

		controlRef.current = new mapboxgl.ScaleControl({
			maxWidth,
			unit,
		});

		map.addControl(controlRef.current, position);

		return (): void => {
			if (controlRef.current) {
				try {
					// Check if map still exists and has removeControl method
					if (map && typeof map.removeControl === "function") {
						map.removeControl(controlRef.current);
					}
				} catch (error) {
					// Silently handle removal errors - map might be destroyed
					console.warn("Error removing scale control:", error);
				} finally {
					controlRef.current = null;
				}
			}
		};
	}, [map, position, maxWidth, unit]);

	return null;
};

export { ScaleControl };
export { type ScaleControlProperties, type ScaleControlReturn };
