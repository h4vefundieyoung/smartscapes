import { type LineStringGeometry } from "../../../../libs/types/types.js";
import { type UserRouteStatusType } from "../../../user-routes/user-routes.js";

type RouteGetByIdResponseDto = {
	createdByUserId: number;
	description: null | string;
	distance: number;
	duration: number;
	geometry: LineStringGeometry;
	id: number;
	name: string;
	pois: {
		id: number;
		name: string;
		visitOrder: number;
	}[];
	userRoute: null | {
		id: number;
		status: UserRouteStatusType;
	};
};

export { type RouteGetByIdResponseDto };
