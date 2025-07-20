import { type APIErrorType } from "../enums/enums.js";
import { type APIValidationErrorDetail } from "./api-validation-error-detail.type.js";
import { type ValueOf } from "./value-of.type.js";

type APIBaseErrorResponse<
	T extends ValueOf<typeof APIErrorType> = ValueOf<typeof APIErrorType>,
	D = undefined,
> = {
	error: (D extends undefined ? object : { details: D }) & {
		message: string;
		type: T;
	};
};

type APICommonErrorResponse = APIBaseErrorResponse<typeof APIErrorType.COMMON>;

type APIErrorResponse = APICommonErrorResponse | APIValidationErrorResponse;

type APIValidationErrorResponse = APIBaseErrorResponse<
	typeof APIErrorType.VALIDATION,
	APIValidationErrorDetail[]
>;

export { type APIErrorResponse };
