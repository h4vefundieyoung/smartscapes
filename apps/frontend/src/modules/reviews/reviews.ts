import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { ReviewsApi } from "./reviews-api.js";

const reviewApi = new ReviewsApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { reviewApi };
export {
	type ReviewGetAllSearchQuery,
	type ReviewGetByIdResponseDto,
	type ReviewRequestDto,
} from "./libs/types/types.js";
export { reviewCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
