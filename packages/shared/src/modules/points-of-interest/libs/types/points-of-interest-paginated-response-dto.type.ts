import { type PointsOfInterestPaginationMeta } from "./points-of-interest-pagination-meta.type.js";
import { type PointsOfInterestResponseDto } from "./points-of-interest-response-dto.type.js";

type PointsOfInterestPaginatedResponseDto = {
	data: PointsOfInterestResponseDto[];
	meta: PointsOfInterestPaginationMeta;
};

export { type PointsOfInterestPaginatedResponseDto };
