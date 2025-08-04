import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

import {
	COORDINATE_INDICES,
	POI_LAYER_DEFAULTS,
} from "./libs/constants/constants.js";
import { type PoiLayerProperties } from "./libs/types/types.js";

const PoiLayer = ({
	isMapReady,
	mapInstance,
	onPoiClick,
	poisData = [],
}: PoiLayerProperties): null => {
	const markersReference = useRef<Map<number, mapboxgl.Marker>>(new Map());

	useEffect(() => {
		if (!mapInstance || !isMapReady || poisData.length === 0) {
			return;
		}

		const markersMap = markersReference.current;

		for (const marker of markersMap.values()) {
			marker.remove();
		}

		markersMap.clear();

		for (const poi of poisData) {
			const marker = new mapboxgl.Marker({
				color: POI_LAYER_DEFAULTS.MARKER_COLOR,
				scale: POI_LAYER_DEFAULTS.MARKER_SIZE,
			})
				.setLngLat([
					poi.location.coordinates[COORDINATE_INDICES.LONGITUDE],
					poi.location.coordinates[COORDINATE_INDICES.LATITUDE],
				])
				.addTo(mapInstance);

			if (onPoiClick) {
				const markerElement = marker.getElement();
				markerElement.style.cursor = "pointer";
				markerElement.addEventListener("click", () => {
					onPoiClick(poi);
				});
			}

			markersMap.set(poi.id, marker);
		}

		return (): void => {
			for (const marker of markersMap.values()) {
				marker.remove();
			}

			markersMap.clear();
		};
	}, [mapInstance, isMapReady, poisData, onPoiClick]);

	return null;
};

export { PoiLayer };
