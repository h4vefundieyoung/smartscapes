import { z } from "zod";

import {
	PointsOfInterestValidationMessage,
	PointsOfInterestValidationRule,
} from "../enums/enums.js";
import { locationSchema } from "./location.validation-schema.js";

const pointOfInterestCreate = z.strictObject({
	description: z
		.string()
		.trim()
		.regex(/^[a-zA-Z0-9\s.,/\\!@#$%^&*()_\-+=:;"'?]+$/, {
			message: PointsOfInterestValidationMessage.DESCRIPTION_INVALID,
		})
		.max(PointsOfInterestValidationRule.DESCRIPTION_MAX_LENGTH, {
			message: PointsOfInterestValidationMessage.DESCRIPTION_MAXIMUM_LENGTH,
		})
		.nullable(),
	location: locationSchema,
	name: z
		.string()
		.regex(/^[a-zA-Z0-9\s.,/\\!@#$%^&*()_\-+=:;"'?]+$/, {
			message: PointsOfInterestValidationMessage.NAME_INVALID,
		})
		.min(PointsOfInterestValidationRule.NAME_MIN_LENGTH, {
			message: PointsOfInterestValidationMessage.NAME_MINIMUM_LENGTH,
		})
		.max(PointsOfInterestValidationRule.NAME_MAX_LENGTH, {
			message: PointsOfInterestValidationMessage.NAME_MAXIMUM_LENGTH,
		}),
});

export { pointOfInterestCreate };
