import { BaseHTTP } from "./base-http.module.js";

const http = new BaseHTTP();

export { http };
export { ExceptionName, HTTPCode, HTTPHeader } from "./libs/enums/enums.js";
export { AuthError, HTTPError } from "./libs/exceptions/exceptions.js";
export {
	type HTTP,
	type HTTPOptions,
	type HTTPResponse,
} from "./libs/types/types.js";
