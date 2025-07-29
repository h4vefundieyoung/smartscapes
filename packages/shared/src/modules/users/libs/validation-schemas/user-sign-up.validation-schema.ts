import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

const userSignUp = z
	.strictObject({
		confirmPassword: z
			.string()
			.trim()
			.nonempty({
				error: UserValidationMessage.PASSWORD_REQUIRED,
			})
			.min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
				error: UserValidationMessage.PASSWORD_MINIMUM_LENGTH,
			}),
		email: z
			.email({
				error: UserValidationMessage.EMAIL_WRONG,
			})
			.trim()
			.min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
				error: UserValidationMessage.EMAIL_REQUIRED,
			}),
		firstName: z
			.string()
			.trim()
			.nonempty({
				error: UserValidationMessage.FIRST_NAME_REQUIRED,
			})
			.min(UserValidationRule.FIRST_NAME_MINIMUM_LENGTH, {
				error: UserValidationMessage.FIRST_NAME_MINIMUM_LENGTH,
			}),
		lastName: z
			.string()
			.trim()
			.nonempty({
				error: UserValidationMessage.LAST_NAME_REQUIRED,
			})
			.min(UserValidationRule.LAST_NAME_MINIMUM_LENGTH, {
				error: UserValidationMessage.LAST_NAME_MINIMUM_LENGTH,
			}),
		password: z
			.string()
			.trim()
			.nonempty({
				error: UserValidationMessage.PASSWORD_REQUIRED,
			})
			.min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
				error: UserValidationMessage.PASSWORD_MINIMUM_LENGTH,
			}),
	})
	.refine((data) => data["password"] === data["confirmPassword"], {
		error: UserValidationMessage.PASSWORDS_DO_NOT_MATCH,
		path: ["confirmPassword"],
	});

export { userSignUp };
