import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import {
	CurrentPosition,
	LocationControl,
	MapControl,
	PoiLayer,
	ScaleControl,
} from "./libs/components/components.js";
import { MAP_DEFAULTS } from "./libs/constants/constants.js";
import { type MapProperties } from "./libs/types/types.js";
import styles from "./styles.module.css";

const MapComponent = ({
	center,
	className,
	currentPosition,
	currentPositionColor = MAP_DEFAULTS.CURRENT_POSITION_COLOR,
	isLocationControl = MAP_DEFAULTS.IS_LOCATION_CONTROL,
	isMapControl = MAP_DEFAULTS.IS_MAP_CONTROL,
	isScaleControl = MAP_DEFAULTS.IS_SCALE_CONTROL,
	isShowCompass = MAP_DEFAULTS.IS_SHOW_COMPASS,
	isTrackUserLocation = MAP_DEFAULTS.IS_TRACK_USER_LOCATION,
	isZoomControl = MAP_DEFAULTS.IS_ZOOM_CONTROL,
	locationControlPosition = MAP_DEFAULTS.LOCATION_CONTROL_POSITION,
	onLocationError,
	onLocationFound,
	onMapReady,
	onPoiClick,
	poisData,
	scaleControlPosition = MAP_DEFAULTS.SCALE_CONTROL_POSITION,
	scaleControlUnit = MAP_DEFAULTS.SCALE_CONTROL_UNIT,
	style = MAP_DEFAULTS.STYLE,
	zoom = MAP_DEFAULTS.ZOOM,
	zoomControlPosition = MAP_DEFAULTS.ZOOM_CONTROL_POSITION,
}: MapProperties): React.JSX.Element => {
	const mapContainer = useRef<HTMLDivElement>(null);
	const mapInstance = useRef<mapboxgl.Map | null>(null);
	const [isMapReady, setIsMapReady] = useState<boolean>(false);

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
		if (!mapContainer.current || mapInstance.current) {
			return;
		}

		const token = import.meta.env["VITE_APP_MAPBOX_ACCESS_TOKEN"] as string;

		if (token) {
			(mapboxgl as unknown as { accessToken: string }).accessToken = token;
		}

		mapInstance.current = new mapboxgl.Map({
			center: initialCenter,
			container: mapContainer.current,
			style,
			zoom: initialZoom,
		});

		mapInstance.current.on("load", (): void => {
			setIsMapReady(true);

			if (mapInstance.current) {
				onMapReady?.(mapInstance.current);
			}
		});

		return (): void => {
			mapInstance.current?.remove();
			mapInstance.current = null;
			setIsMapReady(false);
		};
	}, [style, initialCenter, initialZoom, onMapReady]);

	const handleLocationFound = useCallback(
		(location: { latitude: number; longitude: number }): void => {
			if (shouldUseLocationControl && mapInstance.current && isMapReady) {
				const newCenter: [number, number] = [
					location.longitude,
					location.latitude,
				];

				mapInstance.current.flyTo({
					center: newCenter,
					duration: MAP_DEFAULTS.FLY_TO_DURATION,
					zoom: MAP_DEFAULTS.LOCATION_ZOOM,
				});
			}

			onLocationFound?.(location);
		},
		[shouldUseLocationControl, isMapReady, onLocationFound],
	);

	useEffect(() => {
		if (!mapInstance.current || !isMapReady || !mapContainer.current) {
			return;
		}

		const resizeObserver = new ResizeObserver(() => {
			setTimeout(() => {
				mapInstance.current?.resize();
			}, MAP_DEFAULTS.RESIZE_DELAY);
		});

		resizeObserver.observe(mapContainer.current);

		return (): void => {
			resizeObserver.disconnect();
		};
	}, [isMapReady]);

	return (
		<div className={styles["map-container"]}>
			<div
				className={[styles["map"], className].filter(Boolean).join(" ")}
				ref={mapContainer}
			/>
			{isMapControl && (
				<MapControl
					isMapReady={isMapReady}
					mapInstance={mapInstance.current}
					position={zoomControlPosition}
					showCompass={isShowCompass}
					showZoom={isZoomControl}
				/>
			)}
			{isScaleControl && (
				<ScaleControl
					enabled={isScaleControl}
					isMapReady={isMapReady}
					mapInstance={mapInstance.current}
					position={scaleControlPosition}
					unit={scaleControlUnit}
				/>
			)}
			{isLocationControl && (
				<LocationControl
					autoTrigger={shouldUseLocationControl}
					enabled={isLocationControl}
					isMapReady={isMapReady}
					mapInstance={mapInstance.current}
					onLocationError={onLocationError}
					onLocationFound={handleLocationFound}
					position={locationControlPosition}
					showAccuracyCircle
					showUserHeading
					trackUserLocation={isTrackUserLocation}
				/>
			)}
			{currentPosition && (
				<CurrentPosition
					color={currentPositionColor}
					isMapReady={isMapReady}
					mapInstance={mapInstance.current}
					position={currentPosition}
				/>
			)}
			{poisData && poisData.length > 0 && (
				<PoiLayer
					isMapReady={isMapReady}
					mapInstance={mapInstance.current}
					onPoiClick={onPoiClick}
					poisData={poisData}
				/>
			)}
		</div>
	);
};

const MemoizedMap = React.memo(MapComponent);

export { MemoizedMap as Map };
