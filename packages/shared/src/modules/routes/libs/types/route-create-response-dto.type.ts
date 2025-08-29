import { type RouteGetByIdResponseDto } from "./route-get-by-id-response-dto.type.js";

type RouteCreateResponseDto = Omit<
	RouteGetByIdResponseDto,
	"images" | "pois"
> & {
	pois: {
		id: number;
		name: string;
		visitOrder: number;
	}[];
};

export { type RouteCreateResponseDto };
