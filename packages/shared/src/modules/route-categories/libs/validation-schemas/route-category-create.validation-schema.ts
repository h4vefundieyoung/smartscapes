import { z } from "zod";

import {
	RouteCategoriesValidationRule,
	RouteCatigoriesValidationMessage,
} from "../enums/enums.js";

const routeCategoryCreate = z.object({
	key: z
		.string()
		.regex(/^[a-zA-Z-]+$/, {
			message: RouteCatigoriesValidationMessage.CATEGORY_INVALID_NAME,
		})
		.min(RouteCategoriesValidationRule.CATEGORY_MINIMUM_LENGTH, {
			message: RouteCatigoriesValidationMessage.CATEGORY_MINIMUM_LENGTH,
		})
		.max(RouteCategoriesValidationRule.CATEGORY_MAXIMUM_LENGTH, {
			message: RouteCatigoriesValidationMessage.CATEGORY_MAXIMUM_LENGTH,
		}),
	name: z
		.string()
		.regex(/^[a-zA-Z-]+$/, {
			message: RouteCatigoriesValidationMessage.CATEGORY_INVALID_KEY,
		})
		.min(RouteCategoriesValidationRule.CATEGORY_MINIMUM_LENGTH, {
			message: RouteCatigoriesValidationMessage.CATEGORY_MINIMUM_LENGTH,
		})
		.max(RouteCategoriesValidationRule.CATEGORY_MAXIMUM_LENGTH, {
			message: RouteCatigoriesValidationMessage.CATEGORY_MAXIMUM_LENGTH,
		}),
});

export { routeCategoryCreate };
