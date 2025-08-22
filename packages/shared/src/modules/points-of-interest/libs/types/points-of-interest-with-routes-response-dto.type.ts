import { type RouteGetByIdResponseDto } from "../../../routes/routes.js";
import { type PointsOfInterestResponseDto } from "./points-of-interest-response-dto.type.js";

type PointsOfInterestWithRoutesDto = PointsOfInterestResponseDto & {
	routes: Pick<RouteGetByIdResponseDto, "id" | "name">[];
};

export { type PointsOfInterestWithRoutesDto };
