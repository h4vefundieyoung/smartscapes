import { type PaginationQuery } from "../../../../libs/types/types.js";

type PointsOfInterestQueryRequest = PaginationQuery & {
	latitude?: number;
	longitude?: number;
	name?: string;
	radius?: number;
	search?: string;
};

export { type PointsOfInterestQueryRequest };
