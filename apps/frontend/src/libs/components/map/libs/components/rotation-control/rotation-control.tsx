import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

import { useMapContext } from "../../context/context.js";
import {
	type RotationControlProperties,
	type RotationControlReturn,
} from "./types.js";

const RotationControl = ({
	position = "top-right",
}: RotationControlProperties): RotationControlReturn => {
	const { map } = useMapContext();
	const controlRef = useRef<mapboxgl.NavigationControl | null>(null);

	useEffect((): (() => void) | undefined => {
		if (!map) {
			return;
		}

		controlRef.current = new mapboxgl.NavigationControl({
			showCompass: true,
			showZoom: false,
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
					console.warn("Error removing rotation control:", error);
				} finally {
					controlRef.current = null;
				}
			}
		};
	}, [map, position]);

	return null;
};

export { RotationControl };
export { type RotationControlProperties, type RotationControlReturn };
