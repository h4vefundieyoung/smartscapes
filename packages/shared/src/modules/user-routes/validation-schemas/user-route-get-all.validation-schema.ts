import { z } from "zod";

import { UserRouteValidationMessage } from "../libs/enums/enums.js";

const userRouteGetAll = z.object({
	id: z
		.string()
		.refine((value) => !Number.isNaN(Number(value)), {
			message: UserRouteValidationMessage.USER_ID_INVALID_TYPE,
		})
		.transform(Number),
});

export { userRouteGetAll };
