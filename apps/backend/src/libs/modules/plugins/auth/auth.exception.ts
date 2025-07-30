import { AuthExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { HTTPError } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

class AuthError extends HTTPError {
	public constructor(
		cause: unknown = null,
		message: string = AuthExceptionMessage.UNAUTHORIZED_REQUEST,
		status: ValueOf<typeof HTTPCode> = HTTPCode.UNAUTHORIZED,
	) {
		super({ cause, message, status });
	}
}

export { AuthError };
