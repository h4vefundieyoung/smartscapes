import { type PointGeometry } from "../../../../libs/types/types.js";

type PointsOfInterestResponseDto = {
	description: null | string;
	id: number;
	location: PointGeometry;
	name: string;
};

export { type PointsOfInterestResponseDto };
