import { type PointGeometry } from "../../../../libs/types/types.js";

type PointsOfInterestCreateRequestDto = {
	description: null | string;
	location: PointGeometry;
	name: string;
};

export { type PointsOfInterestCreateRequestDto };
