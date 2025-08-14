import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { RoutesApi } from "./routes-api.js";

const routeApi = new RoutesApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { routeApi };
export { type RouteGetByIdResponseDto } from "./libs/types/types.js";
export { actions, reducer } from "./slices/routes.js";
