import { createContext, useContext } from "react";
import type mapboxgl from "mapbox-gl";

import { type LayerVisibility } from "../types/types.js";

interface MapContextValue {
	map: mapboxgl.Map | null;
	layersVisible?: LayerVisibility;
	onLayerVisibilityChange?: (layerId: string, visible: boolean) => void;
}

const MapContext = createContext<MapContextValue | null>(null);

const useMapContext = (): MapContextValue => {
	const context = useContext(MapContext);
	if (!context) {
		throw new Error("useMapContext must be used within a Map component");
	}
	return context;
};

export { MapContext, useMapContext, type MapContextValue };
