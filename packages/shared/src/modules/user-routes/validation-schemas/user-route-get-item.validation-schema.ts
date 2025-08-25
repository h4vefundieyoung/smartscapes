import { z } from "zod";

import { parseToFloat } from "../../../libs/helpers/helpers.js";

const userRouteGetItem = z.object({
	routeId: z.string().transform(parseToFloat).pipe(z.number()),
});

export { userRouteGetItem };
