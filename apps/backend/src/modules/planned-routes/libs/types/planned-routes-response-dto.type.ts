import { type LineStringGeometry } from "~/libs/types/types.js";

type PlannedRoutesResponseDto = {
	distance: number;
	duration: number;
	geometry: LineStringGeometry;
	id: number;
};

export { type PlannedRoutesResponseDto };
