import { type RouteGetByIdResponseDto } from "./route-get-by-id-response-dto.type.js";

type RouteGetAllItemResponseDto = Omit<RouteGetByIdResponseDto, "description">;

export { type RouteGetAllItemResponseDto };
