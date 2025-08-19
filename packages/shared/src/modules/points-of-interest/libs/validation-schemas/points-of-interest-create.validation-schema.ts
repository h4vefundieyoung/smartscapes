import { z } from "zod";

import {
	PointsOfInterestValidationMessage,
	PointsOfInterestValidationRule,
} from "../enums/enums.js";
import { locationSchema } from "./location.validation-schema.js";

const pointsOfInterestCreate = z.strictObject({
	description: z
		.string()
		.trim()
		.max(PointsOfInterestValidationRule.DESCRIPTION_MAX_LENGTH, {
			message: PointsOfInterestValidationMessage.DESCRIPTION_MAXIMUM_LENGTH,
		})
		.nullable(),
	location: locationSchema,
	name: z
		.string()
		.min(PointsOfInterestValidationRule.NAME_MIN_LENGTH, {
			message: PointsOfInterestValidationMessage.NAME_MINIMUM_LENGTH,
		})
		.max(PointsOfInterestValidationRule.NAME_MAX_LENGTH, {
			message: PointsOfInterestValidationMessage.NAME_MAXIMUM_LENGTH,
		}),
});

export { pointsOfInterestCreate };
