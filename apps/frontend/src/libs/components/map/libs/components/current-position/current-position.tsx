import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

import { CURRENT_POSITION_DEFAULTS } from "./libs/constants/constants.js";
import { type CurrentPositionProperties } from "./libs/types/types.js";

const CurrentPosition = ({
	color = CURRENT_POSITION_DEFAULTS.COLOR,
	isMapReady,
	mapInstance,
	position,
}: CurrentPositionProperties): null => {
	const markerReference = useRef<mapboxgl.Marker | null>(null);

	useEffect(() => {
		if (!mapInstance || !isMapReady) {
			return;
		}

		if (markerReference.current) {
			markerReference.current.remove();
			markerReference.current = null;
		}

		if (position) {
			markerReference.current = new mapboxgl.Marker({
				color,
			})
				.setLngLat(position)
				.addTo(mapInstance);
		}

		return (): void => {
			if (markerReference.current) {
				markerReference.current.remove();
				markerReference.current = null;
			}
		};
	}, [mapInstance, isMapReady, position, color]);

	return null;
};

export { CurrentPosition };
