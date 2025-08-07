import { type MapboxGL } from "../types/types.js";

const isMapClientReady = (
	accessToken: null | string | undefined,
	mapClient: MapboxGL | null,
): mapClient is MapboxGL => {
	return Boolean(accessToken && mapClient);
};

export { isMapClientReady };
