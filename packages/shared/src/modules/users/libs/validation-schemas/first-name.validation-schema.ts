import { z } from "zod";

import { checkIsLatinLetter } from "../../../../libs/helpers/helpers.js";
import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

const firstNameValidationSchema = z
	.string()
	.trim()
	.min(UserValidationRule.REQUIRED_STRING_MIN_LENGTH, {
		error: UserValidationMessage.FIRST_NAME_REQUIRED,
	})
	.min(UserValidationRule.FIRST_NAME_MINIMUM_LENGTH, {
		error: UserValidationMessage.FIRST_NAME_MINIMUM_LENGTH,
	})
	.max(UserValidationRule.MAX_LENGTH, {
		error: UserValidationMessage.FIRST_NAME_MAXIMUM_LENGTH,
	})
	.refine(checkIsLatinLetter, {
		message: UserValidationMessage.FIRST_NAME_INVALID,
	});
export { firstNameValidationSchema };
