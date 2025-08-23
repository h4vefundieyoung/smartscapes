import { type PaginationQuery } from "../../../../libs/types/types.js";

type PointsOfInterestGetAllQuery = PaginationQuery & {
	latitude?: number;
	longitude?: number;
	name?: string;
	radius?: number;
	search?: string;
};

export { type PointsOfInterestGetAllQuery };
