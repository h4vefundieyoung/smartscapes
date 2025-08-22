import { type LineStringGeometry } from "../../../../libs/types/types.js";

type RouteGetByIdResponseDto = {
	createdByUserId: number;
	description: string;
	distance: number;
	duration: number;
	geometry: LineStringGeometry;
	id: number;
	imagesUrl: null | string[];
	name: string;
	pois: {
		id: number;
		visitOrder: number;
	}[];
};

export { type RouteGetByIdResponseDto };
