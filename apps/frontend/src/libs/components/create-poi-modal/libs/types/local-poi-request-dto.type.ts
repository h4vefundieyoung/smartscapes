import { type LocalPointGeometry } from "./local-point-geomety.type.js";

type LocalPointsOfInterestRequestDto = {
	description: null | string;
	location: LocalPointGeometry;
	name: string;
};

export { type LocalPointsOfInterestRequestDto };
