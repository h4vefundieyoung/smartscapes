import { z } from "zod";

import { UserRouteValidationMessage } from "../libs/enums/enums.js";

const userRouteCreate = z.object({
	routeId: z.number({
		message: UserRouteValidationMessage.ROUTE_ID_INVALID_TYPE,
	}),
});

export { userRouteCreate };
