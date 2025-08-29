import { type UserRouteStatusType } from "./user-route-status.type.js";

type UserRouteGetAllQueryRequestDto = {
	status?: UserRouteStatusType;
	userId: number;
};

export { type UserRouteGetAllQueryRequestDto };
