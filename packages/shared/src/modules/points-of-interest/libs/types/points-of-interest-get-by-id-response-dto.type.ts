import { type PointGeometry } from "../../../../libs/types/types.js";

type PointsOfInterestGetByIdResponseDto = {
	description: null | string;
	id: number;
	location: PointGeometry;
	name: string;
	routes: {
		id: number;
		name: string;
	}[];
};

export { type PointsOfInterestGetByIdResponseDto };
