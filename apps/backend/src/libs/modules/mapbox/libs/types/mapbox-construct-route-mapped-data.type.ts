import { type LineStringGeometry } from "~/libs/types/types.js";

type MapboxConstructRouteMappedData = {
	internalId: string;
	route: {
		distance: number;
		duration: number;
		geometry: LineStringGeometry;
	};
};

export { type MapboxConstructRouteMappedData };
