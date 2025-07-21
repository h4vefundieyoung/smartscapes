import { type Middleware } from "@reduxjs/toolkit";

import { showError } from "~/libs/modules/notification/notification.js";

const errorHandlingMiddleware: Middleware =
	() =>
	(next) =>
	(action): unknown => {
		if (
			action &&
			typeof action === "object" &&
			"error" in action &&
			action.error
		) {
			const { message } : { message?: string } = action.error as { message?: string };

			showError(message);
		}

		return next(action);
	};

export { errorHandlingMiddleware };
