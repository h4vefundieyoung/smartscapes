import { type PointGeometry } from "../../../../libs/types/types.js";

type PointsOfInterestRequestDto = {
	description: null | string;
	location: null | PointGeometry;
	name: string;
};

export { type PointsOfInterestRequestDto };
