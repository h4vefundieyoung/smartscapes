import { type UserRouteStatusType } from "./user-route-status.type.js";

type UserRouteGetAllQueryRequestDto = {
	id: number;
	status?: UserRouteStatusType;
};

export { type UserRouteGetAllQueryRequestDto };
