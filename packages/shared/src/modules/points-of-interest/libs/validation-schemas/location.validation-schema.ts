import { z } from "zod";

import { LocationType } from "../../../../libs/enums/enums.js";
import { PointsOfInterestValidationRule } from "../enums/enums.js";
import { PointsOfInterestValidationMessage } from "../enums/points-of-interest-validation-message.enum.js";

const locationSchema = z.object({
	coordinates: z.tuple([
		z
			.number()
			.min(
				PointsOfInterestValidationRule.LONGITUDE_MIN,
				PointsOfInterestValidationMessage.LONGITUDE_MIN,
			)
			.max(
				PointsOfInterestValidationRule.LONGITUDE_MAX,
				PointsOfInterestValidationMessage.LONGITUDE_MAX,
			),
		z
			.number()
			.min(
				PointsOfInterestValidationRule.LATITUDE_MIN,
				PointsOfInterestValidationMessage.LATITUDE_MIN,
			)
			.max(
				PointsOfInterestValidationRule.LATITUDE_MAX,
				PointsOfInterestValidationMessage.LATITUDE_MAX,
			),
	]),
	type: z.literal(LocationType.POINT, {
		message: PointsOfInterestValidationMessage.INVALID_LOCATION_TYPE,
	}),
});

export { locationSchema };
