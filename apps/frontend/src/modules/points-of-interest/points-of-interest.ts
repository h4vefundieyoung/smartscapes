import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { PointsOfInterestApi } from "./points-of-interest.api.js";

const pointsOfInterestApi = new PointsOfInterestApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { pointsOfInterestApi };
export { type PointsOfInterestResponseDto } from "./libs/types/types.js";
export {
	actions,
	pointsOfInterestDetailsReducer,
} from "./slices/points-of-interest.js";
