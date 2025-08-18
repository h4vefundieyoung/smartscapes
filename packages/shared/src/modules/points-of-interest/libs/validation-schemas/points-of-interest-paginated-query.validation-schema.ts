import { z } from "zod";

const pointsOfInterestPaginatedQuery = z.object({
	page: z.string().trim().optional(),
	perPage: z.string().trim().optional(),
	search: z.string().trim().optional(),
});

export { pointsOfInterestPaginatedQuery };
