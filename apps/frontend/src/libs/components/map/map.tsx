import React from "react";

import { combineClassNames } from "~/libs/helpers/helpers.js";
import {
	useCallback,
	useEffect,
	useMap,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";

import {
	GEOLOCATE_CONTROLS_PARAMETERS,
	MAP_PARAMETERS,
	NAVIGATION_CONTROL_PARAMETERS,
	SCALE_CONTROL_PARAMETERS,
} from "./libs/consts/consts.js";
import {
	autoLocation,
	cleanupMapInstance,
	clearMarkersArray,
	isContainerReady,
	mapResize,
	setupContainerRetry,
} from "./libs/helpers/helpers.js";
import {
	createGeolocateControl,
	createMap,
	createMarker,
	createNavigationControl,
	createScaleControl,
	setupGeolocateControlEvents,
} from "./libs/modules/modules.js";
import {
	type LngLatLike,
	type LocationData,
	type MapboxGL,
	type MapboxMap,
	type MapboxMarker,
	type MapProperties,
} from "./libs/types/types.js";
import {
	isMapClientReady,
	validateMarkerPosition,
} from "./libs/validations/validations.js";
import styles from "./styles.module.css";

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
			!isMapClientReady(accessToken, mapClient)
		) {
			return;
		}

		const container = mapContainer.current;

		if (!isContainerReady(container)) {
			return setupContainerRetry(container, () => {
				setIsMapReady(false);
			});
		}

		const map = createMap(mapClient as MapboxGL, container, center);

		map.on("load", () => {
			const navigationControl = createNavigationControl(mapClient as MapboxGL);
			const scaleControl = createScaleControl(mapClient as MapboxGL);
			const geolocateControl = createGeolocateControl(mapClient as MapboxGL);

			map.addControl(navigationControl, NAVIGATION_CONTROL_PARAMETERS.POSITION);
			map.addControl(scaleControl, SCALE_CONTROL_PARAMETERS.POSITION);
			map.addControl(geolocateControl, GEOLOCATE_CONTROLS_PARAMETERS.POSITION);

			setupGeolocateControlEvents(
				geolocateControl,
				handleLocationFound,
				onLocationError,
			);

			setIsMapReady(true);
			autoLocation(geolocateControl, map, center);
		});

		mapInstance.current = map;

		return (): void => {
			cleanupMapInstance(mapInstance, setIsMapReady);
		};
	}, [center, handleLocationFound, onLocationError, accessToken, mapClient]);

	useEffect(() => {
		if (!mapInstance.current || !isMapReady || !mapClient) {
			return;
		}

		clearMarkersArray(markersReference);

		const currentMapInstance = mapInstance.current;
		const currentMapClient = mapClient;

		for (const markerPosition of markers.filter(
			(marker): marker is LngLatLike => validateMarkerPosition(marker),
		)) {
			const marker = createMarker({
				map: currentMapInstance,
				mapClient: currentMapClient,
				...(onMarkerClick && { onMarkerClick }),
				position: markerPosition,
			});

			markersReference.current.push(marker);
		}

		return (): void => {
			clearMarkersArray(markersReference);
		};
	}, [isMapReady, markers, onMarkerClick, mapClient]);

	useEffect(() => {
		if (!mapContainer.current || !mapInstance.current) {
			return;
		}

		return mapResize(mapContainer.current, mapInstance.current);
	}, [isMapReady]);

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
