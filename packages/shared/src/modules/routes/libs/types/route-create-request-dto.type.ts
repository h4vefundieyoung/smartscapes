type RouteCreateRequestDto = {
	createdByUserId: number;
	description: string;
	name: string;
	plannedPathId: number;
	poiIds: number[];
};

export { type RouteCreateRequestDto };
