import { z } from "zod";

import {
	CoordinatesValidationMessage,
	CoordinatesValidationRule,
	LocationType,
} from "../../../../libs/enums/enums.js";
import {
	PointsOfInterestValidationMessage,
	PointsOfInterestValidationRule,
} from "../enums/enums.js";

const pointsOfInterestCreate = z.strictObject({
	description: z
		.string()
		.trim()
		.max(PointsOfInterestValidationRule.DESCRIPTION_MAX_LENGTH, {
			message: PointsOfInterestValidationMessage.DESCRIPTION_MAXIMUM_LENGTH,
		})
		.nullable(),
	location: z.object(
		{
			coordinates: z.tuple([
				z
					.number()
					.min(
						CoordinatesValidationRule.LONGITUDE_MIN,
						CoordinatesValidationMessage.LONGITUDE_MIN,
					)
					.max(
						CoordinatesValidationRule.LONGITUDE_MAX,
						CoordinatesValidationMessage.LONGITUDE_MAX,
					),
				z
					.number()
					.min(
						CoordinatesValidationRule.LATITUDE_MIN,
						CoordinatesValidationMessage.LATITUDE_MIN,
					)
					.max(
						CoordinatesValidationRule.LATITUDE_MAX,
						CoordinatesValidationMessage.LATITUDE_MAX,
					),
			]),
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
