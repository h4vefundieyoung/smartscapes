import { type RouteCreateRequestDto } from "~/modules/routes/routes.js";

const DEFAULT_CREATE_ROUTE_PAYLOAD: RouteCreateRequestDto = {
	description: "",
	name: "",
	pois: [],
};

export { DEFAULT_CREATE_ROUTE_PAYLOAD };
