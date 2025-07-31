import { useEffect } from "react";

import { useMapContext } from "../../context/context.js";
import {
	DEFAULT_ROUTE_COLOR,
	DEFAULT_ROUTE_OPACITY,
	DEFAULT_ROUTE_WIDTH,
} from "../../constants/constants.js";
import { type LineProperties, type LineReturn } from "../../types/types.js";

const Line = ({
	coordinates,
	id,
	paint = {},
	layout = {},
	beforeId,
	layerId,
	visible,
}: LineProperties): LineReturn => {
	const { map, layersVisible } = useMapContext();

	// Determine if line should be visible
	const isVisible = layerId
		? (layersVisible?.[layerId] ?? visible ?? true)
		: (visible ?? true);

	useEffect((): (() => void) | undefined => {
		if (!map || !coordinates || coordinates.length < 2 || !id) {
			return;
		}

		// Add source
		map.addSource(id, {
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

		// Add layer
		map.addLayer(
			{
				id,
				layout: {
					"line-cap": "round",
					"line-join": "round",
					visibility: isVisible ? "visible" : "none",
					...layout,
				},
				paint: {
					"line-color": DEFAULT_ROUTE_COLOR,
					"line-opacity": DEFAULT_ROUTE_OPACITY,
					"line-width": DEFAULT_ROUTE_WIDTH,
					...paint,
				},
				source: id,
				type: "line",
			},
			beforeId,
		);

		return (): void => {
			if (map.getLayer(id)) {
				map.removeLayer(id);
			}
			if (map.getSource(id)) {
				map.removeSource(id);
			}
		};
	}, [map, coordinates, id, paint, layout, beforeId, isVisible]);

	// Update layer visibility when it changes
	useEffect((): void => {
		if (!map || !map.getLayer(id)) {
			return;
		}

		map.setLayoutProperty(id, "visibility", isVisible ? "visible" : "none");
	}, [map, id, isVisible]);

	return null;
};

export { Line };
export { type LineProperties, type LineReturn } from "../../types/types.js";
