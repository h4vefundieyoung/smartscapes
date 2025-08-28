import { type LineStringGeometry } from "../../../../libs/types/types.js";
import { type UserRouteStatusType } from "./user-route-status.type.js";

type UserRouteResponseDto = {
	actualGeometry: LineStringGeometry;
	completedAt: null | string;
	id: number;
	plannedGeometry: LineStringGeometry;
	routeId: number;
	routeName: string;
	startedAt: null | string;
	status: UserRouteStatusType;
	userId: number;
};

export { type UserRouteResponseDto };
