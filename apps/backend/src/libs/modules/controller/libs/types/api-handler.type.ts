import { type APIHandlerOptions } from "./api-handler-options.type.js";
import { type APIHandlerResponse } from "./api-handler-response.type.js";

type APIHandler<
	HandlerOptions extends APIHandlerOptions = APIHandlerOptions,
	HandlerResponsePayload = unknown,
	HandlerResponseMeta = unknown,
> = (
	options: HandlerOptions,
) =>
	| APIHandlerResponse<HandlerResponsePayload, HandlerResponseMeta>
	| Promise<APIHandlerResponse<HandlerResponsePayload, HandlerResponseMeta>>;

export { type APIHandler };
