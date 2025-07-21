import {
	isRejected,
	type Middleware,
	type UnknownAction,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

type NextFunction = (action: unknown) => unknown;

const handleError = (
	action: UnknownAction & { error: { message?: string } },
): void => {
	const errorMessage = action.error.message || "An unexpected error occurred";
	toast.error(errorMessage);
};

const handleAction =
	(next: NextFunction) =>
	(action: unknown): unknown => {
		if (isRejected(action)) {
			handleError(action as UnknownAction & { error: { message?: string } });
		}

		return next(action);
	};

const errorHandlingMiddleware: Middleware = () => handleAction;

export { errorHandlingMiddleware };
