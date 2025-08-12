import { z } from "zod";

const pointsOfInterestPaginatedQuery = z.object({
	limit: z.coerce.number().int().positive(),
	page: z.coerce.number().int().positive(),
	search: z.string().trim().optional(),
});

export { pointsOfInterestPaginatedQuery };
