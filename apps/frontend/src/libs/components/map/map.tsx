import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import { type MapProperties } from "./libs/types/types.js";

import {
	CurrentPosition,
	LocationControl,
	MapControl,
	ScaleControl,
} from "./libs/components/components.js";
import { MAP_DEFAULTS } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Map = ({
	className,
	center,
	zoom = MAP_DEFAULTS.ZOOM,
	style = MAP_DEFAULTS.STYLE,
	currentPosition,
	currentPositionColor = MAP_DEFAULTS.CURRENT_POSITION_COLOR,
	isMapControl = MAP_DEFAULTS.IS_MAP_CONTROL,
	isZoomControl = MAP_DEFAULTS.IS_ZOOM_CONTROL,
	zoomControlPosition = MAP_DEFAULTS.ZOOM_CONTROL_POSITION,
	isShowCompass = MAP_DEFAULTS.IS_SHOW_COMPASS,
	isScaleControl = MAP_DEFAULTS.IS_SCALE_CONTROL,
	scaleControlPosition = MAP_DEFAULTS.SCALE_CONTROL_POSITION,
	scaleControlUnit = MAP_DEFAULTS.SCALE_CONTROL_UNIT,
	isLocationControl = MAP_DEFAULTS.IS_LOCATION_CONTROL,
	locationControlPosition = MAP_DEFAULTS.LOCATION_CONTROL_POSITION,
	isTrackUserLocation = MAP_DEFAULTS.IS_TRACK_USER_LOCATION,
	onLocationFound,
	onLocationError,
	onMapReady,
}: MapProperties): React.JSX.Element => {
	const mapContainer = useRef<HTMLDivElement>(null);
	const mapInstance = useRef<mapboxgl.Map | null>(null);
	const [isMapReady, setIsMapReady] = useState(false);

	const shouldUseLocationControl = useMemo(() => !center, [center]);
	const initialCenter = useMemo(
		() => center || MAP_DEFAULTS.FALLBACK_CENTER,
		[center],
	);
	const initialZoom = useMemo(
		() => (center ? zoom : MAP_DEFAULTS.FALLBACK_ZOOM),
		[center, zoom],
	);

	useEffect(() => {
		if (!mapContainer.current || mapInstance.current) return;

		const token = import.meta.env["VITE_APP_MAPBOX_ACCESS_TOKEN"] as string;
		if (token) {
			(mapboxgl as unknown as { accessToken: string }).accessToken = token;
		}

		mapInstance.current = new mapboxgl.Map({
			container: mapContainer.current,
			style,
			center: initialCenter,
			zoom: initialZoom,
		});

		mapInstance.current.on("load", () => {
			setIsMapReady(true);
			onMapReady?.(mapInstance.current!);
		});

		return () => {
			mapInstance.current?.remove();
			mapInstance.current = null;
			setIsMapReady(false);
		};
	}, [style, initialCenter, initialZoom, onMapReady]);

	const handleLocationFound = useCallback(
		(location: { latitude: number; longitude: number }) => {
			if (shouldUseLocationControl && mapInstance.current && isMapReady) {
				const newCenter: [number, number] = [
					location.longitude,
					location.latitude,
				];

				mapInstance.current.flyTo({
					center: newCenter,
					zoom: MAP_DEFAULTS.LOCATION_ZOOM,
					duration: MAP_DEFAULTS.FLY_TO_DURATION,
				});
			}

			onLocationFound?.(location);
		},
		[shouldUseLocationControl, isMapReady, onLocationFound],
	);

	useEffect(() => {
		if (!mapInstance.current || !isMapReady || !mapContainer.current) return;

		const resizeObserver = new ResizeObserver(() => {
			setTimeout(() => {
				mapInstance.current?.resize();
			}, MAP_DEFAULTS.RESIZE_DELAY);
		});

		resizeObserver.observe(mapContainer.current);
		return () => resizeObserver.disconnect();
	}, [isMapReady]);

	return (
		<div className={styles["map-container"]}>
			<div
				ref={mapContainer}
				className={`${styles["map"]} ${className || ""}`.trim()}
			/>
			{isMapControl && (
				<MapControl
					mapInstance={mapInstance.current}
					isMapReady={isMapReady}
					showZoom={isZoomControl}
					showCompass={isShowCompass}
					position={zoomControlPosition}
				/>
			)}
			{isScaleControl && (
				<ScaleControl
					mapInstance={mapInstance.current}
					isMapReady={isMapReady}
					enabled={isScaleControl}
					position={scaleControlPosition}
					unit={scaleControlUnit}
				/>
			)}
			{isLocationControl && (
				<LocationControl
					mapInstance={mapInstance.current}
					isMapReady={isMapReady}
					enabled={isLocationControl}
					position={locationControlPosition}
					onLocationFound={handleLocationFound}
					onLocationError={onLocationError}
					autoTrigger={shouldUseLocationControl}
					trackUserLocation={isTrackUserLocation}
					showUserHeading={shouldUseLocationControl}
					showAccuracyCircle={shouldUseLocationControl}
				/>
			)}
			{currentPosition && (
				<CurrentPosition
					mapInstance={mapInstance.current}
					isMapReady={isMapReady}
					position={currentPosition}
					color={currentPositionColor}
				/>
			)}
		</div>
	);
};

const MemoizedMap = React.memo(Map);

export { MemoizedMap as Map };
