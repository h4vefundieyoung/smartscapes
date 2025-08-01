import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

const userSignIn = z.strictObject({
	email: z
		.string()
		.trim()
		.min(UserValidationRule.REQUIRED_STRING_MIN_LENGTH, {
			error: UserValidationMessage.EMAIL_REQUIRED,
		})
		.min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
			error: UserValidationMessage.EMAIL_MINIMUM_LENGTH,
		})
		.refine(
			(email) => {
				return !UserValidationRule.BANNED_EMAIL_DOMAINS.some((domain) =>
					email.toLowerCase().endsWith(domain),
				);
			},
			{
				error: UserValidationMessage.EMAIL_DOMAIN_NOT_ALLOWED,
			},
		)
		.pipe(
			z.email({
				error: UserValidationMessage.EMAIL_WRONG,
			}),
		),
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
});

export { userSignIn };
