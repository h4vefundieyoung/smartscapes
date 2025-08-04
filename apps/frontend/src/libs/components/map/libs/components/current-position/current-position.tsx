import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

import { CURRENT_POSITION_DEFAULTS } from "./libs/constants/constants.js";
import { type CurrentPositionProperties } from "./libs/types/types.js";

const CurrentPosition = ({
	mapInstance,
	isMapReady,
	position,
	color = CURRENT_POSITION_DEFAULTS.COLOR,
}: CurrentPositionProperties): null => {
	const markerRef = useRef<mapboxgl.Marker | null>(null);

	useEffect(() => {
		if (!mapInstance || !isMapReady) return;

		if (markerRef.current) {
			markerRef.current.remove();
			markerRef.current = null;
		}

		if (position) {
			markerRef.current = new mapboxgl.Marker({
				color,
			})
				.setLngLat(position)
				.addTo(mapInstance);
		}

		return () => {
			if (markerRef.current) {
				markerRef.current.remove();
				markerRef.current = null;
			}
		};
	}, [mapInstance, isMapReady, position, color]);

	return null;
};

export { CurrentPosition };
