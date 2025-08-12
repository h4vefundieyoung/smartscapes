import { type LocationType } from "../enums/enums.js";

type PointGeometry = {
	coordinates: [string, string];
	type: typeof LocationType.POINT;
};

export { type PointGeometry };
