import { type PointsOfInterestRequestDto } from "~/modules/points-of-interest/points-of-interest.js";

type CreatePOIFormValues = Pick<
	PointsOfInterestRequestDto,
	"description" | "name"
> & {
	location: null | PointsOfInterestRequestDto["location"];
};

const DEFAULT_CREATE_POI_PAYLOAD: CreatePOIFormValues = {
	description: null,
	location: null,
	name: "",
};

export { type CreatePOIFormValues, DEFAULT_CREATE_POI_PAYLOAD };
