import { z } from "zod";

const userRouteValidationSchema = {
	routeId: z.object({
		routeId: z.number().positive(),
	}),
};

export { userRouteValidationSchema };
