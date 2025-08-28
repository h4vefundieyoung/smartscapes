import { type UserRouteEntity } from "../../user-route.entity.js";

type UserRouteGetAllFilters = Partial<
	Pick<ReturnType<UserRouteEntity["toObject"]>, "routeId" | "status" | "userId">
>;

export { type UserRouteGetAllFilters };
