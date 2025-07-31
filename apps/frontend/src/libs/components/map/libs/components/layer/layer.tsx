import {
	cloneElement,
	isValidElement,
	type ReactElement,
	type ReactNode,
} from "react";

import { useMapContext } from "../../context/context.js";
import { type LayerProperties, type LayerReturn } from "../../types/types.js";

const Layer = ({ children, id, visible }: LayerProperties): LayerReturn => {
	const { layersVisible } = useMapContext();

	// Determine if layer should be visible
	const isVisible = id
		? (layersVisible?.[id] ?? visible ?? true)
		: (visible ?? true);

	if (!isVisible) {
		return <></>;
	}

	// Clone children and pass layer context if needed
	const clonedChildren = Array.isArray(children)
		? children.map((child, index) => {
				if (isValidElement(child)) {
					return cloneElement(child as ReactElement, {
						key: index,
					});
				}
				return child;
			})
		: children;

	return <>{clonedChildren}</>;
};

export { Layer };
export { type LayerProperties, type LayerReturn } from "../../types/types.js";
