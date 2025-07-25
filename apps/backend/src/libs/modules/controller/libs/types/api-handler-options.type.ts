import { type UserGetAllItemResponseDto } from "@smartscapes/shared";

type APIHandlerOptions<
	HandlerOptions extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
	body: HandlerOptions["body"];
	params: HandlerOptions["params"];
	query: HandlerOptions["query"];
	user?: HandlerOptions["user"];
};

type DefaultApiHandlerOptions = {
	body?: unknown;
	params?: unknown;
	query?: unknown;
	user?: UserGetAllItemResponseDto;
};

export { type APIHandlerOptions };
