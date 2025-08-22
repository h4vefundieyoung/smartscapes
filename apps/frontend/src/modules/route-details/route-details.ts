import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { RouteDetailsApi } from "./route-details-api.js";

const routeDetailsApi = new RouteDetailsApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { routeDetailsApi };
export {
	type ReviewGetByIdResponseDto,
	type ReviewRequestDto,
} from "./libs/types/types.js";
export { reviewCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
