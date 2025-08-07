import React, { createContext, useMemo } from "react";

import {
	type MapContextValue,
	type MapProviderProperties,
} from "./libs/types/types.js";

const MapContext = createContext<MapContextValue | null>(null);

const MapProvider = ({
	accessToken,
	children,
}: MapProviderProperties): React.JSX.Element => {
	const contextValue = useMemo<MapContextValue>(
		() => ({
			accessToken: accessToken || null,
		}),
		[accessToken],
	);

	return (
		<MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
	);
};

export { MapContext, MapProvider };
