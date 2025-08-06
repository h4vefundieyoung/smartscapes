import { MARKER_PARAMETERS } from "../consts/consts.js";
import {
	type LngLatLike,
	type MapboxGL,
	type MapboxMap,
	type MapboxMarker,
} from "../types/types.js";

type CreateMarkerOptions = {
	map: MapboxMap;
	mapClient: MapboxGL;
	onMarkerClick?: (position: LngLatLike) => void;
	position: LngLatLike;
};

const createMarker = ({
	map,
	mapClient,
	onMarkerClick,
	position,
}: CreateMarkerOptions): MapboxMarker => {
	const marker = new mapClient.Marker({
		color: MARKER_PARAMETERS.DEFAULT_COLOR,
		scale: MARKER_PARAMETERS.DEFAULT_SCALE,
	})
		.setLngLat(position)
		.addTo(map);

	if (onMarkerClick) {
		const element = marker.getElement();
		element.style.cursor = "pointer";
		element.addEventListener("click", () => {
			onMarkerClick(position);
		});
	}

	return marker;
};

export { createMarker };
