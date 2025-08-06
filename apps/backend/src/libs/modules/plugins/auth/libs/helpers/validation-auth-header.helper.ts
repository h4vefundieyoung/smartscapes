import { AuthError } from "~/modules/auth/libs/exceptions/exceptions.js";

const validationAuthHeader = (authHeader: string | undefined): string => {
	if (!authHeader?.startsWith("Bearer ")) {
		throw new AuthError({
			message: "Invalid or missing authrization header.",
		});
	}

	const [, token] = authHeader.split(" ");

	if (!token) {
		throw new AuthError({
			message: "Token not provided.",
		});
	}

	return token;
};

export { validationAuthHeader };
