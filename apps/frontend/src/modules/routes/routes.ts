import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { RoutesApi } from "./routes-api.js";

const routesApi = new RoutesApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { routesApi };
export { reducer } from "./slices/routes.js";
