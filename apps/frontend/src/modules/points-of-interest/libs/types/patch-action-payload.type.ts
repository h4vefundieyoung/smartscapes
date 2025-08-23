import { type PointOfInterestPatchRequestDto } from "~/modules/points-of-interest/points-of-interest.js";

type PatchActionPayload = {
	id: number;
	payload: PointOfInterestPatchRequestDto;
};

export { type PatchActionPayload };
