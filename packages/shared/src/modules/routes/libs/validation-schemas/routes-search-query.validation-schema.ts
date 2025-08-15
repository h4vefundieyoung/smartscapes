import { z } from "zod";

import {
	RoutesValidationMessage,
	RoutesValidationRule,
} from "../enums/enums.js";

const routesSearchQuery = z.object({
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
	poiIds: z.array(z.coerce.number().int().positive()).optional(),
});

export { routesSearchQuery };
