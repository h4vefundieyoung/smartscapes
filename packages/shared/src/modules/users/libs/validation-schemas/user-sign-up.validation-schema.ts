import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";
import { emailValidationSchema } from "./email.validation-schema.js";
import { firstNameValidationSchema } from "./first-name.validation-schema.js";
import { lastNameValidationSchema } from "./last-name.validation-schema.js";

const userSignUp = z
	.strictObject({
		confirmPassword: z
			.string()
			.trim()
			.min(UserValidationRule.REQUIRED_STRING_MIN_LENGTH, {
				error: UserValidationMessage.PASSWORD_REQUIRED,
			})
			.min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
				error: UserValidationMessage.PASSWORD_MINIMUM_LENGTH,
			})
			.max(UserValidationRule.MAX_LENGTH, {
				error: UserValidationMessage.PASSWORD_MAXIMUM_LENGTH,
			}),
		email: emailValidationSchema,
		firstName: firstNameValidationSchema,
		lastName: lastNameValidationSchema,
		password: z
			.string()
			.trim()
			.min(UserValidationRule.REQUIRED_STRING_MIN_LENGTH, {
				error: UserValidationMessage.PASSWORD_REQUIRED,
			})
			.min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
				error: UserValidationMessage.PASSWORD_MINIMUM_LENGTH,
			})
			.max(UserValidationRule.MAX_LENGTH, {
				error: UserValidationMessage.PASSWORD_MAXIMUM_LENGTH,
			}),
	})
	.refine((data) => data["password"] === data["confirmPassword"], {
		error: UserValidationMessage.PASSWORDS_DO_NOT_MATCH,
		path: ["confirmPassword"],
	});

export { userSignUp };
