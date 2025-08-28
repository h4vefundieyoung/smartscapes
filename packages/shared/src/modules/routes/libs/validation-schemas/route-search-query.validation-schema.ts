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
			.min(RoutesValidationRule.SEARCH_NAME_MINIMUM_LENGTH, {
				message: RoutesValidationMessage.SEARCH_NAME_MINIMUM_LENGTH,
			})
			.max(RoutesValidationRule.NAME_MAXIMUM_LENGTH, {
				message: RoutesValidationMessage.NAME_MAXIMUM_LENGTH,
			})
			.optional(),
		page: z
			.string()
			.trim()
			.transform(parseToFloat)
			.pipe(
				z
					.number()
					.min(RoutesValidationRule.MIN_PAGE, RoutesValidationMessage.MIN_PAGE),
			)
			.optional(),
		perPage: z
			.string()
			.trim()
			.transform(parseToFloat)
			.pipe(
				z
					.number()
					.min(
						RoutesValidationRule.MIN_PER_PAGE,
						RoutesValidationMessage.MIN_PER_PAGE,
					),
			)
			.optional(),
	})
	.refine(
		({ latitude, longitude }) => Boolean(latitude) === Boolean(longitude),
		{
			message: PointsOfInterestValidationMessage.COORDS_REQUIRED_TOGETHER,
		},
	)
	.refine(
		({ page, perPage }) => (page !== undefined) === (perPage !== undefined),
		{
			message: RoutesValidationMessage.PAGINATION_PARAMS_REQUIRED_TOGETHER,
		},
	);

export { routesSearchQuery };
