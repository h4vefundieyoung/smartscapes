import { type LineStringGeometry } from "../../../../libs/types/types.js";

type RouteResponseConstructDto = {
	internalId: string;
	route: {
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
	};
};

export { type RouteResponseConstructDto };
