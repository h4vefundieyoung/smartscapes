import { useContext } from "react";

import { type MapContextValue } from "~/libs/components/map-provider/libs/types/types.js";
import { MapContext } from "~/libs/components/map-provider/map-provider.js";

const useMap = (): MapContextValue => {
	const context = useContext(MapContext);

	if (!context) {
		return {
			accessToken: null,
			mapClient: null,
		};
	}

	return context;
};

export { useMap };
