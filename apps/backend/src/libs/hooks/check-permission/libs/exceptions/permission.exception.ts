import { HTTPCode } from "~/libs/enums/enums.js";
import { HTTPError } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

import { PermissionExceptionMessage } from "../enums/enums.js";

type Constructor = {
	cause?: unknown;
	message?: string;
	status?: ValueOf<typeof HTTPCode>;
};

class PermissionError extends HTTPError {
	public constructor({
		cause,
		message = PermissionExceptionMessage.PERMISSION_DENIED,
		status = HTTPCode.FORBIDDEN,
	}: Constructor = {}) {
		super({ cause, message, status });
	}
}

export { PermissionError };
