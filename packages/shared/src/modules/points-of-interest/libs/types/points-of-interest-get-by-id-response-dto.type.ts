import { type PointGeometry } from "../../../../libs/types/types.js";
import { type RouteGetByIdResponseDto } from "../../../routes/routes.js";

type PointsOfInterestGetByIdResponseDto = {
	description: null | string;
	id: number;
	location: PointGeometry;
	name: string;
	routes: (Pick<
		RouteGetByIdResponseDto,
		"geometry" | "id" | "name" | "pois"
	> & {
		coverImage: null | string;
	})[];
};

export { type PointsOfInterestGetByIdResponseDto };
