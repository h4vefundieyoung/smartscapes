import { type ServerErrorType } from "../../libs/enums/enums.js";
import { type ServerErrorDetail } from "./server-error-detail.type.js";

type ServerCommonErrorResponse = {
	error: {
		message: string;
		type: typeof ServerErrorType.COMMON;
	};
};

type ServerErrorResponse =
	| ServerCommonErrorResponse
	| ServerValidationErrorResponse;

type ServerValidationErrorResponse = {
	error: {
		details: ServerErrorDetail[];
		message: string;
		type: typeof ServerErrorType.VALIDATION;
	};
};

export {
	type ServerCommonErrorResponse,
	type ServerErrorResponse,
	type ServerValidationErrorResponse,
};
