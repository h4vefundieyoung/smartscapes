import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { type ExtraArguments } from "~/libs/modules/store/libs/types/types.js";

const handleError = ({ toastNotifier }: ExtraArguments): Middleware => {
	return () => {
		return (next) => (action) => {
			if (isRejected(action)) {
				toastNotifier.showError(
					action.error.message ?? ExceptionMessage.UNEXPECTED_ERROR,
				);
			}

			return next(action);
		};
	};
};

export { handleError as handleErrorMiddleware };
