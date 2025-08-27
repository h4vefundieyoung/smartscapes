import { type RouteGetByIdResponseDto } from "./route-get-by-id-response-dto.type.js";

type RoutePatchResponseDto = Omit<RouteGetByIdResponseDto, "savedUserRoute">;

export { type RoutePatchResponseDto };
