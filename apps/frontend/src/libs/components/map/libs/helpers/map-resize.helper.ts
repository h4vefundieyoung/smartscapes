import { MAP_PARAMETERS } from "../consts/consts.js";
import { type MapboxMap } from "../types/types.js";

const mapResize = (
	mapContainer: HTMLDivElement,
	mapInstance: MapboxMap,
): (() => void) => {
	const resizeObserver = new ResizeObserver((): void => {
		setTimeout(() => {
			mapInstance.resize();
		}, MAP_PARAMETERS.RESIZE_TIMEOUT);
	});

	resizeObserver.observe(mapContainer);

	return (): void => {
		resizeObserver.disconnect();
	};
};

export { mapResize };
