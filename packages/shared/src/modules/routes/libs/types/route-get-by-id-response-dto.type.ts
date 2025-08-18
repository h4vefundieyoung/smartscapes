type RouteGetByIdResponseDto = {
	description: string;
	id: number;
	name: string;
	pois: {
		id: number;
		name?: string;
		visitOrder: number;
	}[];
};

export { type RouteGetByIdResponseDto };
