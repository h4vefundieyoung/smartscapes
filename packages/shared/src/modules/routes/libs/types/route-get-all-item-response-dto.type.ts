type RouteGetAllItemResponseDto = {
	id: number;
	name: string;
	pois: {
		id: number;
		name: string;
		visitOrder: number;
	}[];
};

export { type RouteGetAllItemResponseDto };
