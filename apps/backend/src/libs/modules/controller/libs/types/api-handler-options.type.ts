type APIHandlerOptions<
	HandlerOptions extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
	body: HandlerOptions["body"];
	params: HandlerOptions["params"];
	query: HandlerOptions["query"];
};

type DefaultApiHandlerOptions = {
	body?: unknown;
	params?: unknown;
	query?: unknown;
};

export { type APIHandlerOptions };
