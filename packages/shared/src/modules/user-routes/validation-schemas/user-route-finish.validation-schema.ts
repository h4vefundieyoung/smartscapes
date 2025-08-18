import { z } from "zod";

import { LocationType } from "../../../libs/enums/location-type.enum.js";
import { UserRouteValidationMessage } from "../libs/enums/enums.js";

const TWO_COORDINATES = 2;

const lineStringSchema = z.strictObject({
	coordinates: z.array(z.tuple([z.number(), z.number()])).min(TWO_COORDINATES),
	type: z.literal(LocationType.LINE_STRING, {
		message: UserRouteValidationMessage.INVALID_LOCATION_TYPE,
	}),
});

const userRouteFinish = z.strictObject({
	actualPath: lineStringSchema.refine(
		(value) => value.coordinates.length >= TWO_COORDINATES,
		{
			message: UserRouteValidationMessage.INVALID_COORDINATES,
		},
	),
});

export { userRouteFinish };
