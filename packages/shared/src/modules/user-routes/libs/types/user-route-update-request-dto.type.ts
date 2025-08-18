import { type LineStringGeometry } from "../../../../libs/types/types.js";

type UserRouteUpdateRequestDto = {
	actualGeometry: LineStringGeometry;
	routeId: number;
};

export { type UserRouteUpdateRequestDto };
