import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { UserRouteApi } from "./user-route-api.js";

const userRouteApi = new UserRouteApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { userRouteApi };
export { actions, reducer } from "./slices/user-route.js";
