import { type PaginationMeta } from "../../../../libs/types/pagination-meta.type.js";
import { type PointsOfInterestPaginatedSummary } from "./points-of-interest-paginated-summary-dto.type.js";

type PointsOfInterestPaginatedResponseDto = {
	data: PointsOfInterestPaginatedSummary[];
	meta: PaginationMeta;
};

export { type PointsOfInterestPaginatedResponseDto };
