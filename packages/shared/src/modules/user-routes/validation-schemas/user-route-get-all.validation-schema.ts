import { z } from "zod";

import {
	UserRouteStatus,
	UserRouteValidationMessage,
} from "../libs/enums/enums.js";

const userRouteGetAll = z.object({
	id: z
		.string()
		.refine((value) => !Number.isNaN(Number(value)), {
			message: UserRouteValidationMessage.USER_ID_INVALID_TYPE,
		})
		.transform(Number),
	status: z.enum(Object.values(UserRouteStatus)).optional(),
});

export { userRouteGetAll };
