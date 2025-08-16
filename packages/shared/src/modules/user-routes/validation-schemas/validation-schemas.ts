import { z } from "zod";

const userRouteValidationSchemas = {
	routeId: z.object({
		routeId: z.number().positive(),
	}),
};

export { userRouteValidationSchemas };
