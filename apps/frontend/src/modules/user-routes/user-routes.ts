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
export { UserRouteStatus } from "./libs/enums/enums.js";
export { getActualCoordinatesFromStorage } from "./libs/helpers/helpers.js";
export {
	actions,
	userRouteDetailsReducer,
	userRoutesReducer,
} from "./slices/user-routes.js";
