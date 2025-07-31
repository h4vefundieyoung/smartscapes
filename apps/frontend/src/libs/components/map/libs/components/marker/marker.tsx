import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

import { useMapContext } from "../../context/context.js";
import { DEFAULT_MARKER_COLOR } from "../../constants/constants.js";
import { type MarkerProperties, type MarkerReturn } from "../../types/types.js";

const Marker = ({
	coordinates,
	color = DEFAULT_MARKER_COLOR,
	draggable = false,
	onClick,
	children,
}: MarkerProperties): MarkerReturn => {
	const { map } = useMapContext();
	const markerRef = useRef<mapboxgl.Marker | null>(null);

	console.log("🗺️ Marker component:", {
		coordinates,
		color,
		map: !!map,
		mapLoaded: map?.loaded(),
		draggable,
		children: !!children,
	});

	useEffect((): (() => void) | undefined => {
		if (!map || !coordinates) {
			console.log("🚫 Marker: No map or coordinates", {
				map: !!map,
				coordinates,
				mapLoaded: map?.loaded(),
			});
			return;
		}

		// Wait for map to be fully loaded
		const initializeMarker = () => {
			console.log("✅ Initializing marker:", coordinates, "color:", color);
			// Create marker
			markerRef.current = new mapboxgl.Marker({
				color,
				draggable,
			})
				.setLngLat(coordinates)
				.addTo(map);

			console.log("✅ Marker added to map:", coordinates);

			// Add click handler
			if (onClick) {
				markerRef.current.getElement().addEventListener("click", onClick);
			}
		};

		// Add a small delay to ensure map is fully ready for markers
		const timer = setTimeout(() => {
			// Check if map is loaded, if not wait for load event
			if (map.loaded()) {
				initializeMarker();
			} else {
				console.log("🕐 Map not loaded yet, waiting for load event");
				map.on("load", initializeMarker);
			}
		}, 100); // Small delay to ensure map is ready

		return (): void => {
			clearTimeout(timer);
			if (markerRef.current) {
				if (onClick) {
					markerRef.current.getElement().removeEventListener("click", onClick);
				}
				markerRef.current.remove();
				markerRef.current = null;
			}
		};
	}, [map, coordinates, color, draggable, onClick]);

	// Update marker position when coordinates change
	useEffect((): void => {
		if (markerRef.current && coordinates && map && map.loaded()) {
			markerRef.current.setLngLat(coordinates);
		}
	}, [coordinates, map]);

	return null;
};

export { Marker };
export { type MarkerProperties, type MarkerReturn } from "../../types/types.js";
