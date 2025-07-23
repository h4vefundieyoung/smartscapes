const UserValidationRule = {
	EMAIL_MINIMUM_LENGTH: 1,
	FIRST_NAME_MINIMUM_LENGTH: 2,
	LAST_NAME_MINIMUM_LENGTH: 2,
	PASSWORD_MINIMUM_LENGTH: 6,
} as const;

export { UserValidationRule };
