import { type Middleware } from "@reduxjs/toolkit";

import { notificationService } from "~/libs/modules/notification/notification.js";

function withNext(next: (a: unknown) => unknown): (action: unknown) => unknown {
	return function (action: unknown) {
		if (
			action &&
			typeof action === "object" &&
			"error" in action &&
			action.error &&
			typeof action.error === "object" &&
			"message" in action.error
		) {
			notificationService.showError(action.error.message as string);
		}

		return next(action);
	};
}

const errorHandlingMiddleware: Middleware = () => withNext;

export { errorHandlingMiddleware };
