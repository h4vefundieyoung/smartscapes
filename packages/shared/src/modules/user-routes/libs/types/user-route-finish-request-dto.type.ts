import { type LineStringGeometry } from "../../../../libs/types/types.js";

type UserRouteFinishRequestDto = {
	actualGeometry: LineStringGeometry;
	routeId: number;
};

export { type UserRouteFinishRequestDto };
