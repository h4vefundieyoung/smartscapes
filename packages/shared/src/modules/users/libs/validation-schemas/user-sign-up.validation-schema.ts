import { z } from "zod";

import { checkIsLatinLetter } from "../../../../libs/helpers/helpers.js";
import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

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
		firstName: z
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
			}),
		lastName: z
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
			}),
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
