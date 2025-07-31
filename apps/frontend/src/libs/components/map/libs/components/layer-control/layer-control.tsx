import { type JSX } from "react";

import { useMapContext } from "../../context/context.js";
import {
	type LayerControlProperties,
	type LayerControlReturn,
} from "../../types/types.js";

const LayerControl = ({
	layerId,
	label,
	defaultVisible = true,
}: LayerControlProperties): LayerControlReturn => {
	const { layersVisible, onLayerVisibilityChange } = useMapContext();

	const isVisible = layersVisible?.[layerId] ?? defaultVisible;

	const handleToggle = (): void => {
		if (onLayerVisibilityChange) {
			onLayerVisibilityChange(layerId, !isVisible);
		}
	};

	return (
		<label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
			<input checked={isVisible} onChange={handleToggle} type="checkbox" />
			<span>{label || layerId}</span>
		</label>
	);
};

export { LayerControl };
export {
	type LayerControlProperties,
	type LayerControlReturn,
} from "../../types/types.js";
