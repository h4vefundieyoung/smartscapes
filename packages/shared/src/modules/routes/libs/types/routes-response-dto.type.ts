type RouteGetAllItemResponseDto = {
	id: number;
	name: string;
	pois: {
		id: number;
		visitOrder: number;
	}[];
}[];

type RouteGetByIdResponseDto = {
	description: string;
	id: number;
	name: string;
	pois: {
		id: number;
		visitOrder: number;
	}[];
};

export { type RouteGetAllItemResponseDto, type RouteGetByIdResponseDto };
