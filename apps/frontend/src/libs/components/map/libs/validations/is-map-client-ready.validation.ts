import { type MapboxGL } from "../types/types.js";

const isMapClientReady = (
	accessToken: null | string,
	mapClient: MapboxGL | null,
): boolean => {
	return Boolean(accessToken && mapClient);
};

export { isMapClientReady };
