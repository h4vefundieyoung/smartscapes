import { type APIResponse } from "@smartscapes/shared";

import { type HTTPCode } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

type APIHandlerResponse<Data> = {
	payload: APIResponse<Data> | null;
	status: ValueOf<typeof HTTPCode>;
};

export { type APIHandlerResponse };
