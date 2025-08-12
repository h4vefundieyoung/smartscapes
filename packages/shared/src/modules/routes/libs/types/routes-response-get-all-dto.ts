type RouteGetAllItemResponseDto = {
	id: number;
	name: string;
	pois: {
		id: number;
		visitOrder: number;
	}[];
}[];

export { type RouteGetAllItemResponseDto };
