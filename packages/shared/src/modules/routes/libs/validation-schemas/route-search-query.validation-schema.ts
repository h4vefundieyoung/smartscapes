import { z } from "zod";

import {
	CoordinatesValidationMessage,
	CoordinatesValidationRule,
} from "../../../../libs/enums/enums.js";
import { parseToFloat } from "../../../../libs/helpers/helpers.js";
import { PointsOfInterestValidationMessage } from "../../../points-of-interest/libs/enums/enums.js";
import {
	RoutesValidationMessage,
	RoutesValidationRule,
} from "../enums/enums.js";

const categoryKey = z
	.string()
	.regex(/^[a-zA-Z-]+$/, {
		message: RoutesValidationMessage.CATEGORY_INVALID_KEY,
	})
	.min(RoutesValidationRule.CATEGORY_MINIMUM_LENGTH, {
		message: RoutesValidationMessage.CATEGORY_MINIMUM_LENGTH,
	})
	.max(RoutesValidationRule.CATEGORY_MAXIMUM_LENGTH, {
		message: RoutesValidationMessage.CATEGORY_MAXIMUM_LENGTH,
	});

const routesSearchQuery = z
	.object({
		categories: z
			.union([categoryKey, z.array(categoryKey)])
			.transform((value) => (Array.isArray(value) ? value : [value]))
			.optional(),
		latitude: z
			.string()
			.trim()
			.transform(parseToFloat)
			.pipe(
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
						CoordinatesValidationRule.LONGITUDE_MIN,
						CoordinatesValidationMessage.LONGITUDE_MIN,
					)
					.max(
						CoordinatesValidationRule.LONGITUDE_MAX,
						CoordinatesValidationMessage.LONGITUDE_MAX,
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
