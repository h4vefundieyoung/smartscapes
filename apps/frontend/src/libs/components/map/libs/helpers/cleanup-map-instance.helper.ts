import { type RefObject } from "react";

import { type MapboxMap } from "../types/types.js";

const cleanupMapInstance = (
	mapInstanceReference: RefObject<MapboxMap | null>,
	setIsMapReady: (ready: boolean) => void,
): void => {
	if (mapInstanceReference.current) {
		mapInstanceReference.current.remove();
		mapInstanceReference.current = null;
	}

	setIsMapReady(false);
};

export { cleanupMapInstance };
