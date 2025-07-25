import { z, type ZodType } from "zod";

import { type UserSignUpFormValues } from "../../../../../../../apps/frontend/src/pages/auth/libs/types/user-sign-up-form-values.js";
import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

const userSignUp: ZodType<UserSignUpFormValues> = z
	.strictObject({
		confirmPassword: z
			.string()
			.trim()
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
			.min(UserValidationRule.FIRST_NAME_MINIMUM_LENGTH, {
				error: UserValidationMessage.FIRST_NAME_REQUIRED,
			}),
		lastName: z
			.string()
			.trim()
			.min(UserValidationRule.LAST_NAME_MINIMUM_LENGTH, {
				error: UserValidationMessage.LAST_NAME_REQUIRED,
			}),
		password: z
			.string()
			.trim()
			.min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
				error: UserValidationMessage.PASSWORD_MINIMUM_LENGTH,
			}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: UserValidationMessage.PASSWORDS_DO_NOT_MATCH,
		path: ["confirmPassword"],
	});

export { userSignUp };
