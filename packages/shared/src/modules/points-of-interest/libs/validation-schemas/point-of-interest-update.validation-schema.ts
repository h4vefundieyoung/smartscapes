import { z } from "zod";

import {
	PointsOfInterestValidationMessage,
	PointsOfInterestValidationRule,
} from "../enums/enums.js";

const MINIMUM_FIELDS_REQUIRED = 1;

const pointOfInterestUpdate = z
	.strictObject({
		latitude: z
			.number()
			.min(PointsOfInterestValidationRule.LATITUDE_MINIMUM, {
				message: PointsOfInterestValidationMessage.LATITUDE_MINIMUM,
			})
			.max(PointsOfInterestValidationRule.LATITUDE_MAXIMUM, {
				message: PointsOfInterestValidationMessage.LATITUDE_MAXIMUM,
			})
			.optional(),
		longitude: z
			.number()
			.min(PointsOfInterestValidationRule.LONGITUDE_MINIMUM, {
				message: PointsOfInterestValidationMessage.LONGITUDE_MINIMUM,
			})
			.max(PointsOfInterestValidationRule.LONGITUDE_MAXIMUM, {
				message: PointsOfInterestValidationMessage.LONGITUDE_MAXIMUM,
			})
			.optional(),
		name: z
			.string()
			.min(PointsOfInterestValidationRule.NAME_MINIMUM_LENGTH, {
				message: PointsOfInterestValidationMessage.NAME_MINIMUM_LENGTH,
			})
			.max(PointsOfInterestValidationRule.NAME_MAXIMUM_LENGTH, {
				message: PointsOfInterestValidationMessage.NAME_MAXIMUM_LENGTH,
			})
			.optional(),
	})
	.refine(
		(data) => {
			return Object.keys(data).length >= MINIMUM_FIELDS_REQUIRED;
		},
		{
			message: "At least one field must be provided for update",
		},
	);

export { pointOfInterestUpdate };
