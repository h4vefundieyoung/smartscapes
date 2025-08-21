import { z } from "zod";

import { parseToFloat } from "../../../libs/helpers/helpers.js";
import { UserRouteValidationMessage } from "../libs/enums/enums.js";

const userRouteParameters = z.object({
	userId: z
		.string()
		.transform(parseToFloat)
		.pipe(
			z.number({
				message: UserRouteValidationMessage.USER_ID_INVALID_TYPE,
			}),
		),
});

export { userRouteParameters };
