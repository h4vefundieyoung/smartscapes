import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { UserRoutesApi } from "./user-routes-api.js";

const userRoutesApi = new UserRoutesApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { userRoutesApi };
export { actions } from "./slices/user-routes.js";
export { userRoutesReducer } from "./slices/user-routes.js";
export { userRoutesDetailsReducer } from "./slices/user-routes.js";
