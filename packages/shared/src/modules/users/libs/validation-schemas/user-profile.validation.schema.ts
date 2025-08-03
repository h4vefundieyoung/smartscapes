import { z } from "zod";

import { firstNameValidationSchema } from "./first-name.validation-schema.js";
import { lastNameValidationSchema } from "./last-name.validation-schema.js";

const userProfile = z.object({
	firstName: firstNameValidationSchema,
	lastName: lastNameValidationSchema,
});

export { userProfile };
