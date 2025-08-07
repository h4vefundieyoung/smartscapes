import mapboxgl from "mapbox-gl";
import React, { createContext, useMemo } from "react";

import {
	type MapBoxGLWithToken,
	type MapContextValue,
	type MapProviderProperties,
} from "./libs/types/types.js";

const MapContext = createContext<MapContextValue | null>(null);

const MapProvider = ({
	accessToken,
	children,
}: MapProviderProperties): React.JSX.Element => {
	const mapClient = useMemo(() => {
		if (!accessToken) {
			return null;
		}

		(mapboxgl as MapBoxGLWithToken).accessToken = accessToken;

		return mapboxgl;
	}, [accessToken]);

	const contextValue = useMemo<MapContextValue>(
		() => ({
			accessToken: accessToken || null,
			mapClient,
		}),
		[accessToken, mapClient],
	);

	return (
		<MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
	);
};

export { MapContext, MapProvider };
