import z from "zod";

import { parseToFloat } from "../../../../libs/helpers/helpers.js";
import { ReviewValidationMessage } from "../enums/review-validation-message.enum.js";
import { ReviewValidationRule } from "../enums/review-validation-rule.enum.js";

const reviewSearchQuery = z.object({
	poiId: z
		.string()
		.trim()
		.transform(parseToFloat)
		.pipe(
			z
				.number()
				.int(ReviewValidationMessage.POI_ID_MUST_BE_INTEGER)
				.min(
					ReviewValidationRule.ID_MIN_VALUE,
					ReviewValidationMessage.POI_ID_TOO_SMALL,
				),
		)
		.optional(),
});

export { reviewSearchQuery };
