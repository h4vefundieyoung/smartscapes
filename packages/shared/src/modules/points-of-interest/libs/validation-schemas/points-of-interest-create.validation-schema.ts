import { z } from "zod";

import { LocationType } from "../../../../libs/enums/enums.js";
import { coordinateSchema } from "../../../../libs/validated-schemas/validated-schemas.js";
import {
	PointsOfInterestValidationMessage,
	PointsOfInterestValidationRule,
} from "../enums/enums.js";

const pointsOfInterestCreate = z.strictObject({
	description: z
		.string()
		.max(PointsOfInterestValidationRule.DESCRIPTION_MAX_LENGTH, {
			message: PointsOfInterestValidationMessage.DESCRIPTION_MAXIMUM_LENGTH,
		})
		.nullable(),
	location: z.object(
		{
			coordinates: coordinateSchema,
			type: z.literal(LocationType.POINT, {
				message: PointsOfInterestValidationMessage.INVALID_LOCATION_TYPE,
			}),
		},
		{
			error: () => {
				return PointsOfInterestValidationMessage.LOCATION_REQUIRED;
			},
		},
	),
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
