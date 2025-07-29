import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

const userSignIn = z.strictObject({
	email: z
		.email({
			message: UserValidationMessage.EMAIL_WRONG,
		})
		.trim()
		.min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
			message: UserValidationMessage.EMAIL_REQUIRED,
		}),
	password: z.string().trim().min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
		message: UserValidationMessage.PASSWORD_MINIMUM_LENGTH,
	}),
});

export { userSignIn };
