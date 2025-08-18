import { type PaginationQuery } from "../../../../libs/types/types.js";

type PointsOfInterestGetPaginatedSearchQuery = PaginationQuery & {
	search?: string;
};

export { type PointsOfInterestGetPaginatedSearchQuery };
