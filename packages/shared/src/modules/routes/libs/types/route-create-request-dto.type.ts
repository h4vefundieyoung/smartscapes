type RouteCreateRequestDto = {
	createdByUserId: number;
	description: null | string;
	name: string;
	plannedPathId: number;
	poiIds: number[];
};

export { type RouteCreateRequestDto };
