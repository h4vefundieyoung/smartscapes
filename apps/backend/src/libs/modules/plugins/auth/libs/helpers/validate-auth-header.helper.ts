import { AuthExceptionMessage } from "~/modules/auth/libs/enums/enums.js";
import { AuthError } from "~/modules/auth/libs/exceptions/exceptions.js";

const validateAuthHeader = (authHeader: string | undefined): string => {
	if (!authHeader?.startsWith("Bearer ")) {
		throw new AuthError({
			message: AuthExceptionMessage.INVALID_HEADER,
		});
	}

	const [, token] = authHeader.split(" ");

	if (!token) {
		throw new AuthError({
			message: AuthExceptionMessage.TOKEN_NOT_PROVIDED,
		});
	}

	return token;
};

export { validateAuthHeader };
