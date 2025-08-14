import { z } from "zod";

import {
	PointsOfInterestValidationMessage,
	PointsOfInterestValidationRule,
} from "../enums/enums.js";
import { locationSchema } from "./location.validation-schema.js";

const MINIMUM_FIELDS_TO_UPDATE = 1;

const pointOfInterestUpdate = z
	.strictObject({
		description: z
			.string()
			.max(PointsOfInterestValidationRule.DESCRIPTION_MAX_LENGTH, {
				message: PointsOfInterestValidationMessage.DESCRIPTION_MAXIMUM_LENGTH,
			})
			.nullable()
			.refine(
				(value) =>
					value === null ||
					PointsOfInterestValidationRule.LATIN_REGEX.test(value),
				{
					message: PointsOfInterestValidationMessage.DESCRIPTION_LATIN_REGEX,
				},
			),
		location: locationSchema.optional(),
		name: z
			.string()
			.min(PointsOfInterestValidationRule.NAME_MIN_LENGTH, {
				message: PointsOfInterestValidationMessage.NAME_MINIMUM_LENGTH,
			})
			.max(PointsOfInterestValidationRule.NAME_MAX_LENGTH, {
				message: PointsOfInterestValidationMessage.NAME_MAXIMUM_LENGTH,
			})
			.regex(PointsOfInterestValidationRule.LATIN_REGEX, {
				message: PointsOfInterestValidationMessage.NAME_LATIN_REGEX,
			})
			.optional(),
	})
	.refine(
		(data) => {
			return Object.keys(data).length >= MINIMUM_FIELDS_TO_UPDATE;
		},
		{
			message: PointsOfInterestValidationMessage.REQUIRED_FIELDS_FOR_UPDATE,
		},
	);

export { pointOfInterestUpdate };
