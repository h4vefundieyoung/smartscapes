import { z } from "zod";

import { LocationType } from "../../../../libs/enums/enums.js";
import { coordinateSchema } from "../../../../libs/validated-schemas/validated-schemas.js";
import {
	PointsOfInterestValidationMessage,
	PointsOfInterestValidationRule,
} from "../enums/enums.js";

const MINIMUM_FIELDS_TO_UPDATE = 1;

const pointOfInterestUpdate = z
	.strictObject({
		description: z
			.string()
			.max(PointsOfInterestValidationRule.DESCRIPTION_MAX_LENGTH, {
				message: PointsOfInterestValidationMessage.DESCRIPTION_MAXIMUM_LENGTH,
			})
			.nullable(),
		location: z.object({
			coordinates: coordinateSchema,
			type: z.literal(LocationType.POINT, {
				message: PointsOfInterestValidationMessage.INVALID_LOCATION_TYPE,
			}),
		}),
		name: z
			.string()
			.min(PointsOfInterestValidationRule.NAME_MIN_LENGTH, {
				message: PointsOfInterestValidationMessage.NAME_MINIMUM_LENGTH,
			})
			.max(PointsOfInterestValidationRule.NAME_MAX_LENGTH, {
				message: PointsOfInterestValidationMessage.NAME_MAXIMUM_LENGTH,
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
