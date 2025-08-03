import { z } from "zod";

import { checkIsLatinLetter } from "../../../../libs/helpers/helpers.js";
import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

const lastNameValidationSchema = z
	.string()
	.trim()
	.min(UserValidationRule.REQUIRED_STRING_MIN_LENGTH, {
		error: UserValidationMessage.LAST_NAME_REQUIRED,
	})
	.min(UserValidationRule.LAST_NAME_MINIMUM_LENGTH, {
		error: UserValidationMessage.LAST_NAME_MINIMUM_LENGTH,
	})
	.max(UserValidationRule.MAX_LENGTH, {
		error: UserValidationMessage.LAST_NAME_MAXIMUM_LENGTH,
	})
	.refine(checkIsLatinLetter, {
		message: UserValidationMessage.LAST_NAME_INVALID,
	});

export { lastNameValidationSchema };
