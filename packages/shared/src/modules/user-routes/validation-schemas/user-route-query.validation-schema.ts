import { z } from "zod";

import { parseToFloat } from "../../../libs/helpers/helpers.js";
import { UserRouteValidationMessage } from "../libs/enums/enums.js";

const userRouteQuery = z.object({
	routeId: z
		.string()
		.transform(parseToFloat)
		.pipe(
			z.number({
				message: UserRouteValidationMessage.ROUTE_ID_INVALID_TYPE,
			}),
		),
});

export { userRouteQuery };
