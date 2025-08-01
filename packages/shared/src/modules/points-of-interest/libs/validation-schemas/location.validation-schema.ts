import { z } from "zod";

import { PointsOfInterestValidationMessage } from "../enums/enums.js";
import { coordinatesSchema } from "./coordinates.validation-schema.js";

const locationSchema = z.object({
	coordinates: coordinatesSchema,
	type: z.literal("Point", {
		message: PointsOfInterestValidationMessage.INVALID_LOCATION_TYPE,
	}),
});

export { locationSchema };
