import { type PointsOfInterestQueryRequest } from "@smartscapes/shared";

type PointsOfInterestFindAllOptions = PointsOfInterestQueryRequest & {
	ids?: number[];
};

export { type PointsOfInterestFindAllOptions };
