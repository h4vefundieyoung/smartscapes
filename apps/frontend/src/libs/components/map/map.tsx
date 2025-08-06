import type {
	Map as MapboxMap,
	Marker as MapboxMarker,
	ScaleControlOptions,
} from "mapbox-gl";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { combineClassNames } from "~/libs/helpers/helpers.js";
import { useMap } from "~/libs/hooks/hooks.js";

import {
	type LocationData,
	type LngLatLike,
	type MapProperties,
	type Marker,
} from "./libs/types/types.js";
import {
	GEOLOCATE_CONTROLS_PARAMETERS,
	MAP_PARAMETERS,
	MARKER_PARAMETERS,
	NAVIGATION_CONTROL_PARAMETERS,
	SCALE_CONTROL_PARAMETERS,
} from "./libs/consts/consts.js";
import styles from "./styles.module.css";

const COORDINATE_ARRAY_LENGTH = 2;
const RESIZE_TIMEOUT = 100;

const isValidMarkerPosition = (position: Marker): position is LngLatLike => {
	return (
		Array.isArray(position) &&
		position.length === COORDINATE_ARRAY_LENGTH &&
		position.every(
			(coordinate) =>
				typeof coordinate === "number" && Number.isFinite(coordinate),
		)
	);
};

const MapComponent = ({
	center,
	className,
	markers = [],
	onLocationError,
	onLocationFound,
	onMarkerClick,
}: MapProperties): React.JSX.Element => {
	const { accessToken, mapClient } = useMap();
	const mapContainer = useRef<HTMLDivElement>(null);
	const mapInstance = useRef<MapboxMap | null>(null);
	const [isMapReady, setIsMapReady] = useState<boolean>(false);
	const markersReference = useRef<MapboxMarker[]>([]);

	const handleMapLoad = useCallback((): void => {
		setIsMapReady(true);
	}, []);

	const handleLocationFound = useCallback(
		(location: LocationData): void => {
			if (!center && mapInstance.current) {
				mapInstance.current.flyTo({
					center: [location.longitude, location.latitude],
					zoom: MAP_PARAMETERS.LOCATION_ZOOM,
				});
			}

			onLocationFound?.(location);
		},
		[center, onLocationFound],
	);

	useEffect(() => {
		if (
			!mapContainer.current ||
			mapInstance.current ||
			!accessToken ||
			!mapClient
		) {
			return;
		}

		const container = mapContainer.current;

		if (!container.offsetWidth || !container.offsetHeight) {
			const retryTimeout = setTimeout(() => {
				if (
					container.offsetWidth &&
					container.offsetHeight &&
					!mapInstance.current
				) {
					// Container is ready for retry
				}
			}, MAP_PARAMETERS.CONTAINER_RETRY_DELAY);

			return (): void => {
				clearTimeout(retryTimeout);
			};
		}

		const map = new mapClient.Map({
			center: center || (MAP_PARAMETERS.DEFAULT_CENTER as LngLatLike),
			container,
			style: MAP_PARAMETERS.MAP_STYLE,
			zoom: MAP_PARAMETERS.DEFAULT_ZOOM,
		});

		const navigationControl = new mapClient.NavigationControl({
			showCompass: NAVIGATION_CONTROL_PARAMETERS.SHOW_COMPASS,
			showZoom: NAVIGATION_CONTROL_PARAMETERS.SHOW_ZOOM,
			visualizePitch: NAVIGATION_CONTROL_PARAMETERS.VISUALIZE_PITCH,
		});

		const scaleControlOptions: ScaleControlOptions = {
			maxWidth: SCALE_CONTROL_PARAMETERS.MAX_WIDTH,
		};

		if (SCALE_CONTROL_PARAMETERS.UNIT) {
			scaleControlOptions.unit = SCALE_CONTROL_PARAMETERS.UNIT;
		}

		const scaleControl = new mapClient.ScaleControl(scaleControlOptions);

		const geolocateControl = new mapClient.GeolocateControl({
			positionOptions: {
				enableHighAccuracy:
					GEOLOCATE_CONTROLS_PARAMETERS.POSITION_OPTIONS.ENABLE_HIGH_ACCURACY,
			},
			showAccuracyCircle: GEOLOCATE_CONTROLS_PARAMETERS.SHOW_ACCURACY_CIRCLE,
			showUserHeading: GEOLOCATE_CONTROLS_PARAMETERS.SHOW_USER_HEADING,
			trackUserLocation: GEOLOCATE_CONTROLS_PARAMETERS.TRACK_USER_LOCATION,
		});

		map.addControl(navigationControl, NAVIGATION_CONTROL_PARAMETERS.POSITION);
		map.addControl(scaleControl, SCALE_CONTROL_PARAMETERS.POSITION);
		map.addControl(geolocateControl, GEOLOCATE_CONTROLS_PARAMETERS.POSITION);

		geolocateControl.on("geolocate", (event: GeolocationPosition) => {
			handleLocationFound({
				latitude: event.coords.latitude,
				longitude: event.coords.longitude,
			});
		});

		geolocateControl.on("error", (error: GeolocationPositionError) => {
			onLocationError?.(error.message);
		});

		map.on("load", handleMapLoad);

		if (!center) {
			setTimeout(() => {
				if (typeof geolocateControl.trigger === "function") {
					geolocateControl.trigger();
				} else {
					map.flyTo({
						center: MAP_PARAMETERS.DEFAULT_CENTER as LngLatLike,
						zoom: MAP_PARAMETERS.DEFAULT_ZOOM,
					});
				}
			}, MAP_PARAMETERS.BEFORE_LOAD_DELAY);
		}

		mapInstance.current = map;

		return (): void => {
			if (mapInstance.current) {
				mapInstance.current.remove();
			}
			mapInstance.current = null;
			setIsMapReady(false);
		};
	}, [
		center,
		handleLocationFound,
		handleMapLoad,
		onLocationError,
		accessToken,
		mapClient,
	]);

	useEffect(() => {
		if (!isMapReady || !mapInstance.current || !accessToken || !mapClient) {
			return;
		}

		for (const marker of markersReference.current) {
			marker.remove();
		}

		markersReference.current = [];

		if (markers && markers.length > 0) {
			for (const markerPosition of markers) {
				if (!isValidMarkerPosition(markerPosition)) {
					continue;
				}

				const marker = new mapClient.Marker({
					color: MARKER_PARAMETERS.DEFAULT_COLOR,
					scale: MARKER_PARAMETERS.DEFAULT_SCALE,
				})
					.setLngLat(markerPosition)
					.addTo(mapInstance.current);

				if (onMarkerClick) {
					const element = marker.getElement();
					element.style.cursor = "pointer";
					element.addEventListener("click", () => {
						onMarkerClick(markerPosition);
					});
				}

				markersReference.current.push(marker);
			}
		}

		return (): void => {
			for (const marker of markersReference.current) {
				marker.remove();
			}

			markersReference.current = [];
		};
	}, [isMapReady, markers, onMarkerClick, accessToken, mapClient]);

	useEffect(() => {
		if (!mapContainer.current) {
			return;
		}

		const resizeObserver = new ResizeObserver((): void => {
			if (mapInstance.current) {
				setTimeout(() => {
					return mapInstance.current?.resize();
				}, RESIZE_TIMEOUT);
			}
		});

		resizeObserver.observe(mapContainer.current);

		return (): void => {
			resizeObserver.disconnect();
		};
	}, []);

	return (
		<div className={styles["map-container"]}>
			<div
				className={combineClassNames(styles["map"], className)}
				ref={mapContainer}
			/>
		</div>
	);
};

const MemoizedMap = React.memo(MapComponent);

export { MemoizedMap as Map };
