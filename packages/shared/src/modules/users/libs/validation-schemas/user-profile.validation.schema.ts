import { z } from "zod";

import { UserValidationMessage } from "../enums/user-validation-message.enum.js";
import { firstNameValidationSchema } from "./first-name.validation-schema.js";
import { lastNameValidationSchema } from "./last-name.validation-schema.js";

const userProfile = z
	.object({
		firstName: firstNameValidationSchema.optional(),
		lastName: lastNameValidationSchema.optional(),
	})
	.refine((data) => data.firstName || data.lastName, {
		message: UserValidationMessage.FIRST_OR_LAST_NAME_REQUIRED,
	});

export { userProfile };
