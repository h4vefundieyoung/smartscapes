import { type PaginationQuery } from "../../../../libs/types/types.js";

type RouteFindAllOptions = PaginationQuery & {
	categories?: string | string[];
	latitude?: number;
	longitude?: number;
	name?: string;
};

export { type RouteFindAllOptions };
