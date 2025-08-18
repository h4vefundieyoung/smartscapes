import { z } from "zod";

import { UserRouteValidationMessage } from "../libs/enums/enums.js";

const userRouteRequestValidationSchema = z.object({
	routeId: z.number({
		message: UserRouteValidationMessage.ROUTE_ID_INVALID_TYPE,
	}),
	userId: z.number({
		message: UserRouteValidationMessage.USER_ID_INVALID_TYPE,
	}),
});

export { userRouteRequestValidationSchema };
