import { type ContentType } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type GetHeadersOptions = {
	bearerAuth: null | string;
	contentType: null | ValueOf<typeof ContentType>;
};

export { type GetHeadersOptions };
