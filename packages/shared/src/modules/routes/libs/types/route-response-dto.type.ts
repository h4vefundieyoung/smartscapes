type RouteResponseDto = {
	description: string;
	id: number;
	name: string;
	pois: {
		id: number;
		visitOrder: number;
	}[];
};

export { type RouteResponseDto };
