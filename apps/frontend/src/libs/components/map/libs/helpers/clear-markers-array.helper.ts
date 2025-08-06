import { type RefObject } from "react";

import { type MapboxMarker } from "../types/types.js";

const clearMarkersArray = (
	markersReference: RefObject<MapboxMarker[]>,
): void => {
	const markers = markersReference.current;

	for (const marker of markers) {
		marker.remove();
	}

	markersReference.current = [];
};

export { clearMarkersArray };
