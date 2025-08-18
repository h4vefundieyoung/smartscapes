import { z } from "zod";

import { parseToFloat } from "../../../libs/helpers/helpers.js";
import { UserRouteValidationMessage } from "../libs/enums/enums.js";

const userRouteParameters = z.object({
	userId: z
		.string()
		.transform(parseToFloat)
		.pipe(
			z.number({
				message: UserRouteValidationMessage.INVALID_USER_ID,
			}),
		),
});

export { userRouteParameters };
