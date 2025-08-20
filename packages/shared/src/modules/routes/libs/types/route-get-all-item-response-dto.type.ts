import { type LineStringGeometry } from "../../../../libs/types/types.js";

type RouteGetAllItemResponseDto = {
	createdByUserId: number;
	distance: number;
	duration: number;
	geometry: LineStringGeometry;
	id: number;
	name: string;
	pois: {
		id: number;
		name?: string;
		visitOrder: number;
	}[];
};

export { type RouteGetAllItemResponseDto };
