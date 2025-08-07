import { HTTPCode, HTTPError, type ValueOf } from "@smartscapes/shared";

import { GroupExceptionMessage } from "../enums/enums.js";

type Constructor = {
	cause?: unknown;
	message?: string;
	status?: ValueOf<typeof HTTPCode>;
};

class GroupError extends HTTPError {
	public constructor({
		cause,
		message = GroupExceptionMessage.GROUP_NOT_FOUND,
		status = HTTPCode.UNAUTHORIZED,
	}: Constructor = {}) {
		super({ cause, message, status });
	}
}

export { GroupError };
