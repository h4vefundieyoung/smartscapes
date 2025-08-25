import { type PointGeometry } from "../../../../libs/types/types.js";

type PointsOfInterestGetAllItemResponseDto = {
	createdAt: string;
	id: number;
	location: PointGeometry;
	name: string;
};

export { type PointsOfInterestGetAllItemResponseDto };
