type APIHandlerOptions<
	HandlerOptions extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
	body: HandlerOptions["body"];
	params: HandlerOptions["params"];
	query: HandlerOptions["query"];
	user: HandlerOptions["user"];
};

type DefaultApiHandlerOptions = {
	body?: unknown;
	params?: unknown;
	query?: unknown;
	user?: unknown;
};

export { type APIHandlerOptions };
