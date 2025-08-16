type RouteCreateRequestDto = {
	description: string;
	name: string;
	plannedPathId: number;
	pois: number[];
	userId: number;
};

export { type RouteCreateRequestDto };
