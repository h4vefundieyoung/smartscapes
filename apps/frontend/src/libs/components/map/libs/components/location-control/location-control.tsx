import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

import { useMapContext } from "../../context/context.js";
import {
	type LocationControlProperties,
	type LocationControlReturn,
} from "./types.js";

const LocationControl = ({
	position = "top-right",
	onLocationFound,
	onLocationError,
}: LocationControlProperties): LocationControlReturn => {
	const { map } = useMapContext();
	const controlRef = useRef<mapboxgl.GeolocateControl | null>(null);
	const [isTracking, setIsTracking] = useState<boolean>(false);

	useEffect((): (() => void) | undefined => {
		if (!map) {
			return;
		}

		controlRef.current = new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 60000, // Cache position for 1 minute
			},
			trackUserLocation: false, // Disable continuous tracking to reduce updates
			showUserHeading: true,
			showAccuracyCircle: true,
		});

		// Add event listeners
		controlRef.current.on("geolocate", (event) => {
			setIsTracking(true);
			if (onLocationFound) {
				onLocationFound({
					latitude: event.coords.latitude,
					longitude: event.coords.longitude,
				});
			}
		});

		controlRef.current.on("error", (error) => {
			setIsTracking(false);
			const errorMessage = error.message || "Failed to get location";
			if (onLocationError) {
				onLocationError(errorMessage);
			}
			console.warn("Geolocation error:", errorMessage);
		});

		controlRef.current.on("trackuserlocationstart", () => {
			setIsTracking(true);
		});

		controlRef.current.on("trackuserlocationend", () => {
			setIsTracking(false);
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
					console.warn("Error removing location control:", error);
				} finally {
					controlRef.current = null;
					setIsTracking(false);
				}
			}
		};
	}, [map, position, onLocationFound, onLocationError]);

	return null;
};

export { LocationControl };
export { type LocationControlProperties, type LocationControlReturn };
