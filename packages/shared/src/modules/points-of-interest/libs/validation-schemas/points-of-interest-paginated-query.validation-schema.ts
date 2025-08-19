import { z } from "zod";

import { parseToFloat } from "../../../../libs/helpers/helpers.js";

const pointsOfInterestPaginatedQuery = z.object({
	page: z.string().trim().transform(parseToFloat).optional(),
	perPage: z.string().trim().transform(parseToFloat).optional(),
	search: z.string().trim().optional(),
});

export { pointsOfInterestPaginatedQuery };
