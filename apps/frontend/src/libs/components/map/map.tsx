import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";

import { Loader } from "~/libs/components/components.js";

import { MapContext } from "./libs/context/context.js";
import {
	DEFAULT_MAP_CENTER,
	DEFAULT_MAP_ZOOM,
	DEFAULT_ROUTE_COLOR,
	DEFAULT_ROUTE_OPACITY,
	DEFAULT_ROUTE_WIDTH,
	MAPBOX_STYLE_URL,
	MINIMUM_COORDINATES_FOR_ROUTE,
} from "./libs/constants/constants.js";
import { buildRouteCoordinates } from "./libs/helpers/helpers.js";
import {
	DefaultPoiMarker,
	DefaultCurrentPositionMarker,
	DefaultPopup,
	ZoomControl,
	ScaleControl,
	RotationControl,
	LocationControl,
} from "./libs/components/components.js";
import {
	type MapComponentProperties,
	type MapComponentReturn,
} from "./libs/types/types.js";
import styles from "./styles.module.css";

const MINIMUM_POIS_FOR_ROUTE = 2;

const MapboxComponent = ({
	className,
	children,
	center = DEFAULT_MAP_CENTER,
	zoom = DEFAULT_MAP_ZOOM,
	style = MAPBOX_STYLE_URL,
	layersVisible = {},
	onLayerVisibilityChange,

	// POIs layer
	pois = [],
	poisMarker = "default",
	isPoisRoute = false,

	// Current position layer
	currentPosition,
	currentPositionMarker = "default",

	// Popup layer
	isPopup = false,
	popup = "default",

	// Zoom control
	isZoomControl = false,
	zoomControlPosition = "top-right",
	showCompass = true,

	// Scale control
	isScaleControl = false,
	scaleControlPosition = "bottom-left",
	scaleControlMaxWidth = 100,
	scaleControlUnit = "metric",

	// Rotation control
	isRotationControl = false,
	rotationControlPosition = "top-right",

	// Location control
	isLocationControl = false,
	locationControlPosition = "top-right",
	onLocationFound,
	onLocationError,
}: MapComponentProperties): MapComponentReturn => {
	const mapContainer = useRef<HTMLDivElement>(null);
	const mapInstance = useRef<mapboxgl.Map | null>(null);
	const [isRouteLoading, setIsRouteLoading] = useState<boolean>(false);
	const [isMapReady, setIsMapReady] = useState<boolean>(false);
	const [layersReady, setLayersReady] = useState<boolean>(false);

	useEffect((): (() => void) | undefined => {
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

		// Create map instance
		mapInstance.current = new mapboxgl.Map({
			center,
			container: mapContainer.current,
			style,
			zoom,
		});

		// Set map ready when loaded
		mapInstance.current.on("load", () => {
			console.log("Map loaded and ready");
			setIsMapReady(true);
			// Add a small delay before rendering layers to ensure everything is ready
			setTimeout(() => {
				console.log("Layers ready for rendering");
				setLayersReady(true);
			}, 200);
		});

		console.log("Map instance created");

		return (): void => {
			if (mapInstance.current) {
				mapInstance.current.remove();
				mapInstance.current = null;
				setIsMapReady(false);
				setLayersReady(false);
			}
		};
	}, [style, zoom]); // Removed 'center' from dependencies to prevent map recreation

	// Separate effect to update map center without recreating the map
	useEffect(() => {
		if (mapInstance.current && isMapReady && layersReady) {
			console.log("Updating map center to:", center);
			mapInstance.current.setCenter(center);
		}
	}, [center, isMapReady, layersReady]);

	console.log("🗺️ Map component render:", {
		isMapReady,
		poisCount: pois.length,
		currentPosition,
		mapInstance: !!mapInstance.current,
		center: center,
		renderCount: Date.now(),
	});

	const waitForMapLoad = async (): Promise<void> => {
		await new Promise<void>((resolve): void => {
			if (!mapInstance.current) {
				resolve();

				return;
			}

			if (mapInstance.current.loaded()) {
				resolve();
			} else {
				mapInstance.current.on("load", (): void => {
					resolve();
				});
			}
		});
	};

	const removeExistingRoute = (): void => {
		if (!mapInstance.current) {
			console.log("removeExistingRoute: no map instance");
			return;
		}

		if (mapInstance.current.getSource("route")) {
			console.log(
				"removeExistingRoute: removing existing route layer and source",
			);
			mapInstance.current.removeLayer("route");
			mapInstance.current.removeSource("route");
		} else {
			console.log("removeExistingRoute: no existing route source found");
		}
	};

	const addRouteToMap = (coordinates: number[][]): void => {
		console.log("addRouteToMap called with coordinates:", coordinates.length);

		if (
			!mapInstance.current ||
			coordinates.length <= MINIMUM_COORDINATES_FOR_ROUTE
		) {
			console.log("addRouteToMap: insufficient coordinates or no map");
			return;
		}

		console.log("Adding route source and layer to map");
		mapInstance.current.addSource("route", {
			data: {
				geometry: {
					coordinates,
					type: "LineString",
				},
				properties: {},
				type: "Feature",
			},
			type: "geojson",
		});

		mapInstance.current.addLayer({
			id: "route",
			layout: {
				"line-cap": "round",
				"line-join": "round",
			},
			paint: {
				"line-color": DEFAULT_ROUTE_COLOR,
				"line-opacity": DEFAULT_ROUTE_OPACITY,
				"line-width": DEFAULT_ROUTE_WIDTH,
			},
			source: "route",
			type: "line",
		});
		console.log("Route layer added successfully");

		// Verify the route layer was added
		console.log(
			"Map sources after adding route:",
			mapInstance.current.getStyle().sources,
		);
		console.log(
			"Map layers after adding route:",
			mapInstance.current.getStyle().layers?.map((l) => l.id),
		);
		console.log("Route layer exists:", !!mapInstance.current.getLayer("route"));
		console.log(
			"Route source exists:",
			!!mapInstance.current.getSource("route"),
		);
	};

	const addRoadBasedRoute = useCallback(async (): Promise<void> => {
		console.log("addRoadBasedRoute called:", {
			isPoisRoute,
			poisCount: pois.length,
			minimumRequired: MINIMUM_POIS_FOR_ROUTE,
		});

		if (!isPoisRoute || pois.length < MINIMUM_POIS_FOR_ROUTE) {
			console.log("Route conditions not met");
			return;
		}

		console.log("Starting route loading...");
		setIsRouteLoading(true);

		try {
			await waitForMapLoad();
			removeExistingRoute();

			console.log(
				"Building route coordinates for POIs:",
				pois.map((p) => p.name),
			);
			const allRouteCoordinates = await buildRouteCoordinates(pois);
			console.log(
				"Route coordinates built:",
				allRouteCoordinates.length,
				"points",
			);

			addRouteToMap(allRouteCoordinates);
			console.log("Route added to map");
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error("Error adding road routes:", error);
		} finally {
			setIsRouteLoading(false);
		}
	}, [pois, isPoisRoute]);

	useEffect((): (() => void) | undefined => {
		console.log("Route useEffect triggered:", {
			hasMapInstance: !!mapInstance.current,
			isPoisRoute,
			poisCount: pois.length,
			minimumRequired: MINIMUM_POIS_FOR_ROUTE,
			isMapReady,
			currentPosition: !!currentPosition,
		});

		if (
			!mapInstance.current ||
			!isPoisRoute ||
			pois.length < MINIMUM_POIS_FOR_ROUTE ||
			!isMapReady ||
			!layersReady
		) {
			console.log("Route useEffect: conditions not met, exiting");
			return;
		}

		// Add a small delay to ensure everything is ready
		const timer = setTimeout(() => {
			console.log("Route useEffect: calling addRoadBasedRoute after delay");
			void addRoadBasedRoute();
		}, 1000);

		return (): void => {
			clearTimeout(timer);
		};
	}, [pois, isPoisRoute, addRoadBasedRoute, isMapReady, layersReady]);

	// Render POI markers - memoized to prevent unnecessary re-renders
	const renderPoiMarkers = useMemo(() => {
		if (pois.length === 0) {
			console.log("🎯 No POIs to render");
			return null;
		}

		console.log(
			"🎯 Rendering POI markers:",
			pois.length,
			"timestamp:",
			Date.now(),
		);
		const MarkerComponent =
			poisMarker === "default" ? DefaultPoiMarker : poisMarker;

		return pois.map((poi) => (
			<MarkerComponent
				key={poi.id}
				coordinates={[poi.longitude, poi.latitude]}
				data={poi}
			/>
		));
	}, [pois, poisMarker]);

	// Render current position marker - memoized to prevent unnecessary re-renders
	const renderCurrentPositionMarker = useMemo(() => {
		if (!currentPosition) {
			console.log("📍 No current position to render");
			return null;
		}

		console.log(
			"📍 Rendering current position marker:",
			currentPosition,
			"timestamp:",
			Date.now(),
		);
		const MarkerComponent =
			currentPositionMarker === "default"
				? DefaultCurrentPositionMarker
				: currentPositionMarker;

		return <MarkerComponent coordinates={currentPosition} />;
	}, [currentPosition, currentPositionMarker]);

	// Render popups
	const renderPopups = () => {
		if (!isPopup || pois.length === 0) {
			return null;
		}

		const PopupComponent = popup === "default" ? DefaultPopup : popup;

		return pois.map((poi) => (
			<PopupComponent
				key={`popup-${poi.id}`}
				coordinates={[poi.longitude, poi.latitude]}
				data={poi}
			/>
		));
	};

	const additionalClassName = className ?? "";
	const mapContainerClass = styles["map-container"] ?? "";
	const containerClassName =
		`${mapContainerClass} ${additionalClassName}`.trim();

	return (
		<MapContext.Provider
			value={{
				map: mapInstance.current,
				layersVisible,
				...(onLayerVisibilityChange && { onLayerVisibilityChange }),
			}}
		>
			<div className={containerClassName}>
				<div className={styles["map"]} ref={mapContainer} />

				{/* Only render layers when map is ready */}
				{isMapReady && layersReady && (
					<>
						{(() => {
							console.log("All layers rendering:", {
								pois: pois.length,
								currentPosition: !!currentPosition,
								isPoisRoute,
								isPopup,
								mapReady: isMapReady,
								layersReady: layersReady,
							});
							return null;
						})()}

						{/* POI Markers */}
						{(() => {
							console.log("Rendering POI layer");
							return renderPoiMarkers;
						})()}

						{/* Current Position Marker */}
						{(() => {
							console.log("Rendering position layer");
							return renderCurrentPositionMarker;
						})()}

						{/* Popups */}
						{(() => {
							console.log("Rendering popup layer");
							return renderPopups();
						})()}

						{/* Controls */}
						{isZoomControl && (
							<ZoomControl
								position={zoomControlPosition}
								showCompass={showCompass}
							/>
						)}

						{isScaleControl && (
							<ScaleControl
								position={scaleControlPosition}
								maxWidth={scaleControlMaxWidth}
								unit={scaleControlUnit}
							/>
						)}

						{isRotationControl && (
							<RotationControl position={rotationControlPosition} />
						)}

						{isLocationControl && (
							<LocationControl
								position={locationControlPosition}
								{...(onLocationFound && { onLocationFound })}
								{...(onLocationError && { onLocationError })}
							/>
						)}
					</>
				)}

				{/* Custom children */}
				{children}

				{/* Loading indicator */}
				{isRouteLoading && <Loader />}
			</div>
		</MapContext.Provider>
	);
};

export { MapboxComponent as Map };
export {
	type PointOfInterest,
	type CustomMarkerProps,
	type CustomPopupProps,
} from "./libs/types/types.js";
export {
	Feature,
	Layer,
	LayerControl,
	Line,
	LocationControl,
	Marker,
	Popup,
	RotationControl,
	ScaleControl,
	ZoomControl,
	DefaultPoiMarker,
	DefaultCurrentPositionMarker,
	DefaultPopup,
} from "./libs/components/components.js";
