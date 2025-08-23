import { type ReviewRequestDto } from "~/modules/reviews/reviews.js";

const DEFAULT_CREATE_REVIEW_PAYLOAD: Omit<ReviewRequestDto, "routeId"> & {
	routeId: null;
} = {
	content: "",
	poiId: null,
	routeId: null,
};

export { DEFAULT_CREATE_REVIEW_PAYLOAD };
