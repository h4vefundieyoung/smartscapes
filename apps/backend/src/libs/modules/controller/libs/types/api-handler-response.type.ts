import { type HTTPCode } from "~/libs/modules/http/http.js";
import { type APIResponse, type ValueOf } from "~/libs/types/types.js";

type APIHandlerResponse<Data = null, Meta = null> = {
	payload: Data extends null ? null : APIResponse<Data, Meta>;
	status: ValueOf<typeof HTTPCode>;
};

export { type APIHandlerResponse };
