import { useEffect } from "react";

import { useMapContext } from "../../context/context.js";
import {
	type FeatureProperties,
	type FeatureReturn,
} from "../../types/types.js";

const Feature = ({
	coordinates,
	properties = {},
	id,
	onClick,
	symbol,
	paint = {},
	layout = {},
	layerId,
	visible,
}: FeatureProperties): FeatureReturn => {
	const { map, layersVisible } = useMapContext();

	// Determine if feature should be visible
	const isVisible = layerId
		? (layersVisible?.[layerId] ?? visible ?? true)
		: (visible ?? true);

	useEffect((): (() => void) | undefined => {
		if (!map || !coordinates || !id) {
			return;
		}

		// Add source
		map.addSource(id, {
			data: {
				geometry: {
					coordinates,
					type: "Point",
				},
				properties,
				type: "Feature",
			},
			type: "geojson",
		});

		// Add layer for symbol
		map.addLayer({
			id: `${id}-symbol`,
			layout: {
				"icon-allow-overlap": true,
				"icon-image": symbol?.iconImage || "marker-15",
				"icon-size": symbol?.iconSize || 1,
				"text-field": symbol?.textField,
				"text-size": symbol?.textSize || 12,
				"text-offset": [0, 1.25],
				"text-anchor": "top",
				visibility: isVisible ? "visible" : "none",
				...layout,
			},
			paint: {
				"icon-color": symbol?.iconColor || "#3b82f6",
				"text-color": symbol?.textColor || "#1f2937",
				...paint,
			},
			source: id,
			type: "symbol",
		});

		// Add click handler
		if (onClick) {
			map.on("click", `${id}-symbol`, onClick);
		}

		return (): void => {
			if (map.getLayer(`${id}-symbol`)) {
				map.removeLayer(`${id}-symbol`);
			}
			if (map.getSource(id)) {
				map.removeSource(id);
			}
			if (onClick) {
				map.off("click", `${id}-symbol`, onClick);
			}
		};
	}, [
		map,
		coordinates,
		properties,
		id,
		onClick,
		symbol,
		paint,
		layout,
		isVisible,
	]);

	// Update layer visibility when it changes
	useEffect((): void => {
		if (!map || !map.getLayer(`${id}-symbol`)) {
			return;
		}

		map.setLayoutProperty(
			`${id}-symbol`,
			"visibility",
			isVisible ? "visible" : "none",
		);
	}, [map, id, isVisible]);

	return null;
};

export { Feature };
export {
	type FeatureProperties,
	type FeatureReturn,
} from "../../types/types.js";
