import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useRef, useState } from "react";

import { Loader } from "~/libs/components/components.js";

import {
	DEFAULT_MAP_CENTER,
	DEFAULT_MAP_ZOOM,
	DEFAULT_MARKER_COLOR,
	DEFAULT_ROUTE_COLOR,
	DEFAULT_ROUTE_OPACITY,
	DEFAULT_ROUTE_WIDTH,
	MAPBOX_STYLE_URL,
	MINIMUM_COORDINATES_FOR_ROUTE,
	POPUP_OFFSET,
} from "./libs/constants/constants.js";
import {
	buildRouteCoordinates,
	createPopupContent,
} from "./libs/helpers/helpers.js";
import {
	type MapComponentProperties,
	type MapComponentReturn,
} from "./libs/types/types.js";
import styles from "./styles.module.css";

const MINIMUM_POIS_FOR_ROUTE = 2;

const MapboxComponent = ({
	className,
	pois = [],
}: MapComponentProperties): MapComponentReturn => {
	const mapContainer = useRef<HTMLDivElement>(null);
	const mapInstance = useRef<mapboxgl.Map | null>(null);
	const [isRouteLoading, setIsRouteLoading] = useState<boolean>(false);

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
			center: DEFAULT_MAP_CENTER,
			container: mapContainer.current,
			style: MAPBOX_STYLE_URL,
			zoom: DEFAULT_MAP_ZOOM,
		});

		return (): void => {
			if (mapInstance.current) {
				mapInstance.current.remove();
				mapInstance.current = null;
			}
		};
	}, []);

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
			return;
		}

		if (mapInstance.current.getSource("route")) {
			mapInstance.current.removeLayer("route");
			mapInstance.current.removeSource("route");
		}
	};

	const addRouteToMap = (coordinates: number[][]): void => {
		if (
			!mapInstance.current ||
			coordinates.length <= MINIMUM_COORDINATES_FOR_ROUTE
		) {
			return;
		}

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
	};

	const addRoadBasedRoute = useCallback(async (): Promise<void> => {
		setIsRouteLoading(true);

		try {
			await waitForMapLoad();
			removeExistingRoute();

			const allRouteCoordinates = await buildRouteCoordinates(pois);

			addRouteToMap(allRouteCoordinates);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error("Error adding road routes:", error);
		} finally {
			setIsRouteLoading(false);
		}
	}, [pois]);

	const addMarkersToMap = useCallback((): void => {
		if (!mapInstance.current) {
			return;
		}

		for (const poi of pois) {
			new mapboxgl.Marker({ color: DEFAULT_MARKER_COLOR })
				.setLngLat([poi.longitude, poi.latitude])
				.setPopup(
					new mapboxgl.Popup({ offset: POPUP_OFFSET }).setHTML(
						createPopupContent(poi.name),
					),
				)
				.addTo(mapInstance.current);
		}
	}, [pois]);

	useEffect((): void => {
		if (!mapInstance.current || pois.length === 0) {
			return;
		}

		addMarkersToMap();

		if (pois.length >= MINIMUM_POIS_FOR_ROUTE) {
			void addRoadBasedRoute();
		}
	}, [pois, addMarkersToMap, addRoadBasedRoute]);

	const additionalClassName = className ?? "";
	const mapContainerClass = styles["map-container"] ?? "";
	const containerClassName =
		`${mapContainerClass} ${additionalClassName}`.trim();

	return (
		<div className={containerClassName}>
			<div className={styles["map"]} ref={mapContainer} />
			{isRouteLoading && <Loader />}
		</div>
	);
};

export { MapboxComponent as Map };
export { type PointOfInterest } from "./libs/types/types.js";
