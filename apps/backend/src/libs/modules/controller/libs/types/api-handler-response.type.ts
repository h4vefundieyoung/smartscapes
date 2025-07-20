import { type ServerResponse } from "@smartscapes/shared";

import { type HTTPCode } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

type APIHandlerResponse = {
	payload: null | ServerResponse<unknown>;
	status: ValueOf<typeof HTTPCode>;
};

export { type APIHandlerResponse };
