import { type RouteCreateRequestDto } from "~/modules/routes/routes.js";

type CreateRouteFormValues = Omit<
	RouteCreateRequestDto,
	"createdByUserId" | "plannedPathId"
>;

const DEFAULT_CREATE_ROUTE_PAYLOAD: CreateRouteFormValues = {
	description: "",
	name: "",
	poiIds: [],
};

export { DEFAULT_CREATE_ROUTE_PAYLOAD };
