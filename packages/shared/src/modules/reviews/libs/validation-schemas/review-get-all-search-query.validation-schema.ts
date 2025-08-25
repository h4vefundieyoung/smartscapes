import z from "zod";

import { parseToInteger } from "../../../../libs/helpers/helpers.js";
import { ReviewValidationMessage } from "../enums/review-validation-message.enum.js";
import { ReviewValidationRule } from "../enums/review-validation-rule.enum.js";

const reviewGetAllSearchQuery = z.object({
	routeId: z
		.string()
		.trim()
		.transform(parseToInteger)
		.pipe(
			z
				.number()
				.int(ReviewValidationMessage.ROUTE_ID_MUST_BE_INTEGER)
				.min(
					ReviewValidationRule.ID_MIN_VALUE,
					ReviewValidationMessage.ROUTE_ID_TOO_SMALL,
				),
		)
		.optional(),
});

export { reviewGetAllSearchQuery };
