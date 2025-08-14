import { type LineStringGeometry } from "~/libs/types/types.js";

type PlannedRoutesResponseDto = {
	distance: number;
	duration: number;
	geometry: LineStringGeometry;
	id: number;
	userId: number;
};

export { type PlannedRoutesResponseDto };
