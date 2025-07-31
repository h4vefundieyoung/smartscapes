import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

import { useMapContext } from "../../context/context.js";
import { type ZoomControlProperties, type ZoomControlReturn } from "./types.js";

const ZoomControl = ({
	position = "top-right",
	showCompass = true,
}: ZoomControlProperties): ZoomControlReturn => {
	const { map } = useMapContext();
	const controlRef = useRef<mapboxgl.NavigationControl | null>(null);

	useEffect((): (() => void) | undefined => {
		if (!map) {
			return;
		}

		controlRef.current = new mapboxgl.NavigationControl({
			showCompass,
			showZoom: true,
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
					console.warn("Error removing zoom control:", error);
				} finally {
					controlRef.current = null;
				}
			}
		};
	}, [map, position, showCompass]);

	return null;
};

export { ZoomControl };
export { type ZoomControlProperties, type ZoomControlReturn };
