import { type LineStringGeometry } from "../../../../libs/types/types.js";

type RouteGetByIdResponseDto = {
	categories: {
		id: number;
		key: string;
		name: string;
	}[];
	createdByUserId: number;
	description: string;
	distance: number;
	duration: number;
	geometry: LineStringGeometry;
	id: number;
	name: string;
	pois: {
		id: number;
		name: string;
		visitOrder: number;
	}[];
};

export { type RouteGetByIdResponseDto };
