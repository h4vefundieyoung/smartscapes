import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState, type JSX } from "react";

import styles from "./styles.module.css";

// Types following project architecture
type MapProperties = {
	className?: string;
	center?: [number, number];
	zoom?: number;
	style?: string;

	// Current position
	currentPosition?: [number, number] | null;
	currentPositionColor?: string;

	// Controls
	zoomControl?: boolean;
	zoomControlPosition?:
		| "top-left"
		| "top-right"
		| "bottom-left"
		| "bottom-right";
	showCompass?: boolean;

	scaleControl?: boolean;
	scaleControlPosition?:
		| "top-left"
		| "top-right"
		| "bottom-left"
		| "bottom-right";
	scaleControlUnit?: "imperial" | "metric" | "nautical";

	rotationControl?: boolean;
	rotationControlPosition?:
		| "top-left"
		| "top-right"
		| "bottom-left"
		| "bottom-right";

	locationControl?: boolean;
	locationControlPosition?:
		| "top-left"
		| "top-right"
		| "bottom-left"
		| "bottom-right";

	// Event handlers
	onLocationFound?: (position: { latitude: number; longitude: number }) => void;
	onLocationError?: (error: string) => void;
	onMapReady?: (map: mapboxgl.Map) => void;
};

// Default values
const DEFAULT_CENTER: [number, number] = [-73.9654, 40.7829]; // Central Park, NYC
const DEFAULT_ZOOM = 12;
const DEFAULT_STYLE = "mapbox://styles/mapbox/streets-v12";
const DEFAULT_CURRENT_POSITION_COLOR = "#ff00ff";

const Map = ({
	className,
	center = DEFAULT_CENTER,
	zoom = DEFAULT_ZOOM,
	style = DEFAULT_STYLE,
	currentPosition,
	currentPositionColor = DEFAULT_CURRENT_POSITION_COLOR,
	zoomControl = false,
	zoomControlPosition = "top-right",
	showCompass = true,
	scaleControl = false,
	scaleControlPosition = "bottom-left",
	scaleControlUnit = "metric",
	rotationControl = false,
	rotationControlPosition = "top-right",
	locationControl = false,
	locationControlPosition = "top-left",
	onLocationFound,
	onLocationError,
	onMapReady,
}: MapProperties): JSX.Element => {
	const mapContainer = useRef<HTMLDivElement>(null);
	const mapInstance = useRef<mapboxgl.Map | null>(null);
	const currentPositionMarker = useRef<mapboxgl.Marker | null>(null);
	const [isMapReady, setIsMapReady] = useState<boolean>(false);

	// Initialize map
	useEffect(() => {
		if (!mapContainer.current || mapInstance.current) {
			return;
		}

		// Initialize Mapbox access token
		const mapboxAccessToken = import.meta.env[
			"VITE_APP_MAPBOX_ACCESS_TOKEN"
		] as string | undefined;

		if (mapboxAccessToken) {
			(mapboxgl as unknown as { accessToken: string }).accessToken =
				mapboxAccessToken;
		}

		// Create map
		mapInstance.current = new mapboxgl.Map({
			container: mapContainer.current,
			style,
			center,
			zoom,
		});

		// Set map ready when loaded
		mapInstance.current.on("load", () => {
			setIsMapReady(true);
			if (onMapReady && mapInstance.current) {
				onMapReady(mapInstance.current);
			}
		});

		return () => {
			if (currentPositionMarker.current) {
				currentPositionMarker.current.remove();
			}
			mapInstance.current?.remove();
			mapInstance.current = null;
			setIsMapReady(false);
		};
	}, [style, onMapReady]);

	// Update map center and zoom
	useEffect(() => {
		if (mapInstance.current && isMapReady) {
			mapInstance.current.setCenter(center);
			mapInstance.current.setZoom(zoom);
		}
	}, [center, zoom, isMapReady]);

	// Add/update current position marker
	useEffect(() => {
		if (!mapInstance.current || !isMapReady) return;

		// Remove existing marker
		if (currentPositionMarker.current) {
			currentPositionMarker.current.remove();
			currentPositionMarker.current = null;
		}

		// Add new marker if position provided
		if (currentPosition) {
			currentPositionMarker.current = new mapboxgl.Marker({
				color: currentPositionColor,
			})
				.setLngLat(currentPosition)
				.addTo(mapInstance.current);
		}
	}, [currentPosition, currentPositionColor, isMapReady]);

	// Add zoom control
	useEffect(() => {
		if (!mapInstance.current || !isMapReady || !zoomControl) return;

		const control = new mapboxgl.NavigationControl({
			showCompass,
			showZoom: true,
		});

		mapInstance.current.addControl(control, zoomControlPosition);

		return () => {
			if (
				mapInstance.current &&
				mapInstance.current.hasControl &&
				mapInstance.current.hasControl(control)
			) {
				mapInstance.current.removeControl(control);
			}
		};
	}, [zoomControl, zoomControlPosition, showCompass, isMapReady]);

	// Add scale control
	useEffect(() => {
		if (!mapInstance.current || !isMapReady || !scaleControl) return;

		const control = new mapboxgl.ScaleControl({
			maxWidth: 100,
			unit: scaleControlUnit,
		});

		mapInstance.current.addControl(control, scaleControlPosition);

		return () => {
			if (
				mapInstance.current &&
				mapInstance.current.hasControl &&
				mapInstance.current.hasControl(control)
			) {
				mapInstance.current.removeControl(control);
			}
		};
	}, [scaleControl, scaleControlPosition, scaleControlUnit, isMapReady]);

	// Add rotation control
	useEffect(() => {
		if (!mapInstance.current || !isMapReady || !rotationControl) return;

		const control = new mapboxgl.NavigationControl({
			showCompass: true,
			showZoom: false,
		});

		mapInstance.current.addControl(control, rotationControlPosition);

		return () => {
			if (
				mapInstance.current &&
				mapInstance.current.hasControl &&
				mapInstance.current.hasControl(control)
			) {
				mapInstance.current.removeControl(control);
			}
		};
	}, [rotationControl, rotationControlPosition, isMapReady]);

	// Add location control
	useEffect(() => {
		if (!mapInstance.current || !isMapReady || !locationControl) return;

		const control = new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true,
			},
			trackUserLocation: false,
			showUserHeading: true,
			showAccuracyCircle: true,
		});

		// Create event handler references
		const handleGeolocate = (event: any) => {
			if (onLocationFound) {
				onLocationFound({
					latitude: event.coords.latitude,
					longitude: event.coords.longitude,
				});
			}
		};

		const handleError = (error: any) => {
			if (onLocationError) {
				onLocationError(error.message || "Location error");
			}
		};

		// Add event listeners
		if (onLocationFound) {
			control.on("geolocate", handleGeolocate);
		}

		if (onLocationError) {
			control.on("error", handleError);
		}

		mapInstance.current.addControl(control, locationControlPosition);

		return () => {
			if (
				mapInstance.current &&
				mapInstance.current.hasControl &&
				mapInstance.current.hasControl(control)
			) {
				if (onLocationFound) {
					control.off("geolocate", handleGeolocate);
				}
				if (onLocationError) {
					control.off("error", handleError);
				}
				mapInstance.current.removeControl(control);
			}
		};
	}, [
		locationControl,
		locationControlPosition,
		onLocationFound,
		onLocationError,
		isMapReady,
	]);

	return (
		<div className={styles["map-container"]}>
			<div
				ref={mapContainer}
				className={`${styles["map"]} ${className || ""}`.trim()}
				style={{ width: "100%", height: "400px" }}
			/>
		</div>
	);
};

export { Map };
export { type MapProperties };
