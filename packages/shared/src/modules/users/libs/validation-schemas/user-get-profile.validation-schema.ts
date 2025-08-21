import { z } from "zod";

import { UserValidationMessage } from "../enums/enums.js";

const userGetProfile = z.object({
	id: z.coerce
		.number()
		.int({ message: UserValidationMessage.ID_INVALID })
		.positive({ message: UserValidationMessage.ID_INVALID }),
});

export { userGetProfile };
