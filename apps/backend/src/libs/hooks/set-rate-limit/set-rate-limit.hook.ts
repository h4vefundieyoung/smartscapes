import { type APIPreHandler } from "~/libs/modules/controller/libs/types/types.js";
import { type UserAuthResponseDto } from "~/libs/types/types.js";
import { AuthError } from "~/modules/auth/libs/exceptions/unauthorized.exception.js";

import { DEBOUNCER_CONFIG } from "./libs/constants/constants.js";
import { RequestLimitError } from "./libs/exceptions/exceptions.js";

const REQUEST_NUMBER_INITIAL_VALUE = 0;
const REQUEST_NUMBER_INCREMENT_VALUE = 1;

const setRateLimit = (requestsLimitPerMinute: number): APIPreHandler => {
	const userIdToRequestNumber: Map<UserAuthResponseDto["id"], number> =
		new Map();

	return ({ user }, done): void => {
		if (!user) {
			throw new AuthError();
		}

		const { id } = user;
		const requestsNumber = userIdToRequestNumber.get(id);

		if (!requestsNumber) {
			userIdToRequestNumber.set(id, REQUEST_NUMBER_INCREMENT_VALUE);

			setTimeout(() => {
				userIdToRequestNumber.set(id, REQUEST_NUMBER_INITIAL_VALUE);
			}, DEBOUNCER_CONFIG.RESET_TIME);

			return;
		}

		if (requestsNumber >= requestsLimitPerMinute) {
			throw new RequestLimitError();
		}

		userIdToRequestNumber.set(
			id,
			requestsNumber + REQUEST_NUMBER_INCREMENT_VALUE,
		);
		done();
	};
};

export { setRateLimit };
