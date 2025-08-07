import { type Hook } from "../libs/types/types.js";
import { DEBOUNCER_CONFIG } from "./libs/constants/constants.js";
import { RequestLimitError } from "./libs/exceptions/exceptions.js";

const getRequestDebouncer = (requestsLimitPerMinute: number): Hook => {
	let debounceMap: Record<string, number> = {};

	return ({ user }, _, done): void => {
		const id = user?.id as number;

		if (!debounceMap[id]) {
			debounceMap[id] = 1;

			setTimeout(() => {
				debounceMap[id] = 0;
			}, DEBOUNCER_CONFIG.RESET_TIME);

			return;
		}

		const requestsAmount = debounceMap[id];

		if (requestsAmount === requestsLimitPerMinute) {
			throw new RequestLimitError();
		}

		debounceMap[id]++;
		done();
	};
};

export { getRequestDebouncer };
