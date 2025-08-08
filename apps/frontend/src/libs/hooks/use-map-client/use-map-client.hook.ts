import { useContext } from "react";

import { type MapClient } from "~/libs/modules/map-client/map-client.module.js";
import { useMapContext } from "~/libs/components/map-provider/map-provider.js";

const useMapClient = (): MapClient => {
	const client = useMapContext();

	if (!client) {
		throw new Error("useMapClient must be inside a MapProvider");
	}

	return client;
};

export { useMapClient };
