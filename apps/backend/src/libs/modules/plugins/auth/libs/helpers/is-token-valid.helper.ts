import { tokenBlacklistService } from "~/libs/modules/token/token.js";
import { AuthError } from "~/modules/auth/libs/exceptions/exceptions.js";

const isTokenValid = (token: string): void => {
	const isTokenBlacklisted = tokenBlacklistService.has(token);

	if (isTokenBlacklisted) {
		throw new AuthError({
			message: "Token is revoked.",
		});
	}
};

export { isTokenValid };
