import { type PointsOfInterestCreateRequestDto } from "~/modules/points-of-interest/points-of-interest.js";

type CreatePOIFormValues = Pick<
	PointsOfInterestCreateRequestDto,
	"description" | "name"
> & {
	location: null | PointsOfInterestCreateRequestDto["location"];
};

const DEFAULT_CREATE_POI_PAYLOAD: CreatePOIFormValues = {
	description: null,
	location: null,
	name: "",
};

export { type CreatePOIFormValues, DEFAULT_CREATE_POI_PAYLOAD };
