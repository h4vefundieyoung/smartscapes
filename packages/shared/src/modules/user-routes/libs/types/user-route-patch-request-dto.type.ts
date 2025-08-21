import { type LineStringGeometry } from "../../../../libs/types/types.js";

type userRoutePatchRequestDto = {
	actualGeometry: LineStringGeometry;
	routeId: number;
};

export { type userRoutePatchRequestDto };
