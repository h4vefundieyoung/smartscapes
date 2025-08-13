import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { PointsOfInterestApi } from "./point-of-interest-api.js";

const pointsOfInterestApi = new PointsOfInterestApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { pointsOfInterestApi };
export { reducer } from "./slices/points-of-interest.js";
