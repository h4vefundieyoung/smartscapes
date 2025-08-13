import { z } from "zod";

import { LocationType } from "../../../../libs/enums/enums.js";
import { PointsOfInterestValidationRule } from "../enums/enums.js";
import { PointsOfInterestValidationMessage } from "../enums/points-of-interest-validation-message.enum.js";

const longitudeSchema = z
	.number()
	.min(
		PointsOfInterestValidationRule.LONGITUDE_MIN,
		PointsOfInterestValidationMessage.LONGITUDE_MIN,
	)
	.max(
		PointsOfInterestValidationRule.LONGITUDE_MAX,
		PointsOfInterestValidationMessage.LONGITUDE_MAX,
	);

const latitudeSchema = z
	.number()
	.min(
		PointsOfInterestValidationRule.LATITUDE_MIN,
		PointsOfInterestValidationMessage.LATITUDE_MIN,
	)
	.max(
		PointsOfInterestValidationRule.LATITUDE_MAX,
		PointsOfInterestValidationMessage.LATITUDE_MAX,
	);

const locationSchema = z.object({
	coordinates: z.tuple([longitudeSchema, latitudeSchema]),
	type: z.literal(LocationType.POINT, {
		message: PointsOfInterestValidationMessage.INVALID_LOCATION_TYPE,
	}),
});

export { locationSchema };
