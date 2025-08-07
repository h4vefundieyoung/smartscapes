import React, { createContext, useEffect, useMemo, useState } from "react";

import { type MapboxGL } from "~/libs/components/map/libs/types/types.js";

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
	const [mapClient, setMapClient] = useState<MapboxGL | null>(null);

	useEffect(() => {
		const loadMapboxGL = async (): Promise<void> => {
			if (!accessToken || mapClient) {
				return;
			}

			const [mapboxgl] = await Promise.all([
				import("mapbox-gl"),
				import("mapbox-gl/dist/mapbox-gl.css"),
			]);

			(mapboxgl.default as MapBoxGLWithToken).accessToken = accessToken;
			setMapClient(mapboxgl.default);
		};

		void loadMapboxGL();
	}, [accessToken, mapClient]);

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
