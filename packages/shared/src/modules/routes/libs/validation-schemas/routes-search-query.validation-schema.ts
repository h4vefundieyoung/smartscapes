import { z } from "zod";

import {
	RoutesValidationMessage,
	RoutesValidationRule,
} from "../enums/enums.js";

const categoryName = z
	.string()
	.regex(/^[a-zA-Z-]+$/)
	.min(RoutesValidationRule.CATEGORY_MINIMUM_LENGTH, {
		message: RoutesValidationMessage.CATEGORY_MINIMUM_LENGTH,
	})
	.max(RoutesValidationRule.CATEGORY_MAXIMUM_LENGTH, {
		message: RoutesValidationMessage.CATEGORY_MAXIMUM_LENGTH,
	});

const routesSearchQuery = z.object({
	categories: z
		.string()
		.trim()
		.transform((value) => (value ? value.split(",") : undefined))
		.refine(
			(categories) =>
				categories === undefined ||
				categories.every(
					(category) => categoryName.safeParse(category).success,
				),
			{ message: RoutesValidationMessage.CATEGORY_INVALID_KEY },
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
});

export { routesSearchQuery };
