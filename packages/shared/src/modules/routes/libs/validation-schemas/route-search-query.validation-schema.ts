import { z } from "zod";

import {
	latitudeSchema,
	longitudeSchema,
} from "../../../../libs/validated-schemas/validated-schemas.js";
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
		latitude: latitudeSchema.optional(),
		longitude: longitudeSchema.optional(),
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
