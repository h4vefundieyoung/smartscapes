type RouteCreateRequestDto = {
	description: string;
	name: string;
	plannedRouteId: number;
	pois: number[];
	userId: number;
};

export { type RouteCreateRequestDto };
