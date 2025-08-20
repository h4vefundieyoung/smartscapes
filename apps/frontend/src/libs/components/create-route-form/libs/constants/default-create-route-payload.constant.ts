import { type RouteCreateRequestDto } from "~/modules/routes/routes.js";

const DEFAULT_CREATE_ROUTE_PAYLOAD: Partial<RouteCreateRequestDto> = {
	description: "",
	name: "",
	poiIds: [],
};

export { DEFAULT_CREATE_ROUTE_PAYLOAD };
