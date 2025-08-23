import { type LineStringGeometry } from "../../../../libs/types/types.js";

type RouteGetAllItemResponseDto = {
	createdByUserId: number;
	distance: number;
	duration: number;
	geometry: LineStringGeometry;
	id: number;
	images: {
		id: number;
		url: string;
	}[];
	name: string;
	pois: {
		id: number;
		visitOrder: number;
	}[];
};

export { type RouteGetAllItemResponseDto };
