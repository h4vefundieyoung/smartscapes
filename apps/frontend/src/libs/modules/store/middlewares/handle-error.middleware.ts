import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { CommonExceptionMessage } from "~/libs/enums/enums.js";
import { ExceptionName } from "~/libs/modules/http/http.js";
import { type ExtraArguments } from "~/libs/modules/store/libs/types/types.js";
import { logout, signIn } from "~/modules/auth/slices/actions.js";

import { type store } from "../store.js";

const handleError = ({
	toastNotifier,
}: ExtraArguments): Middleware<
	unknown,
	ReturnType<typeof store.instance.getState>,
	typeof store.instance.dispatch
> => {
	return ({ dispatch }) => {
		return (next) => (action) => {
			if (isRejected(action)) {
				if (
					action.error.name === ExceptionName.AUTHORIZATION_ERROR &&
					action.type !== signIn.rejected.type
				) {
					void dispatch(logout());

					return next(action);
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
