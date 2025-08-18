import { z } from "zod";

import { parseToFloat } from "../../../../libs/helpers/helpers.js";
import {
	PointsOfInterestValidationMessage,
	PointsOfInterestValidationRule,
} from "../../../points-of-interest/libs/enums/enums.js";
import {
	RoutesValidationMessage,
	RoutesValidationRule,
} from "../enums/enums.js";

const routesSearchQuery = z
	.object({
		latitude: z
			.string()
			.trim()
			.transform(parseToFloat)
			.pipe(
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
			)
			.optional(),
		longitude: z
			.string()
			.trim()
			.transform(parseToFloat)
			.pipe(
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
			)
			.optional(),
		name: z
			.string()
			.trim()
			.min(RoutesValidationRule.NAME_MINIMUM_LENGTH, {
				message: RoutesValidationMessage.NAME_MINIMUM_LENGTH,
			})
			.max(RoutesValidationRule.NAME_MAXIMUM_LENGTH, {
				message: RoutesValidationMessage.NAME_MAXIMUM_LENGTH,
			})
			.optional(),
	})
	.refine(
		({ latitude, longitude }) => Boolean(latitude) === Boolean(longitude),
		{
			message: PointsOfInterestValidationMessage.COORDS_REQUIRED_TOGETHER,
		},
	);

export { routesSearchQuery };
