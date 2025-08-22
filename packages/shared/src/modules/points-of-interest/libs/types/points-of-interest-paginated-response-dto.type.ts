import { type PaginationMeta } from "../../../../libs/types/pagination-meta.type.js";
import { type PointsOfInterestItemDto } from "./points-of-interest-item-dto.type.js";

type PointsOfInterestPaginatedResponseDto = {
	data: PointsOfInterestItemDto[];
	meta: PaginationMeta;
};

export { type PointsOfInterestPaginatedResponseDto };
