type RouteCreateRequestDto = {
	description: string;
	name: string;
	plannedRouteId: number;
	pois: number[];
	userId: string;
};

export { type RouteCreateRequestDto };
