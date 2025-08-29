import { type LineStringGeometry } from "../../../../libs/types/types.js";
import { type UserRouteStatusType } from "./user-route-status.type.js";

type UserRouteResponseDto = {
	actualGeometry: LineStringGeometry;
	completedAt: null | string;
	distance: number;
	id: number;
	plannedGeometry: LineStringGeometry;
	reviewComment: null | string;
	routeId: number;
	routeName: string;
	startedAt: null | string;
	status: UserRouteStatusType;
	userId: number;
};

export { type UserRouteResponseDto };
