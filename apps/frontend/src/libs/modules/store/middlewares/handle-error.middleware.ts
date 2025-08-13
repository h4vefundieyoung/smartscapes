import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { CommonExceptionMessage } from "~/libs/enums/enums.js";
import { ExceptionName } from "~/libs/modules/http/http.js";
import { type ExtraArguments } from "~/libs/modules/store/libs/types/types.js";
import { signIn } from "~/modules/auth/slices/actions.js";

const handleError = ({ toastNotifier }: ExtraArguments): Middleware => {
	return () => {
		return (next) => (action) => {
			if (isRejected(action)) {
				if (
					action.error.name === ExceptionName.AUTHORIZATION_ERROR &&
					action.type !== signIn.rejected.type
				) {
					return;
				}

				toastNotifier.showError(
					action.error.message ??
						CommonExceptionMessage.COMMON_EXCEPTION_MESSAGE,
				);
			}

			return next(action);
		};
	};
};

export { handleError as handleErrorMiddleware };
