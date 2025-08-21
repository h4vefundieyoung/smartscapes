import { type LineStringGeometry } from "../../../../libs/types/types.js";

type UserRoutePatchRequestDto = {
	actualGeometry: LineStringGeometry;
	routeId: number;
};

export { type UserRoutePatchRequestDto };
