import { z } from "zod";

import { LocationType } from "../../../libs/enums/enums.js";
import { coordinateSchema } from "../../../libs/validated-schemas/validated-schemas.js";
import { UserRouteValidationMessage } from "../libs/enums/enums.js";

const userRoutePatch = z.strictObject({
	actualGeometry: z.object(
		{
			coordinates: coordinateSchema,
			type: z.literal(LocationType.LINE_STRING, {
				message: UserRouteValidationMessage.INVALID_LOCATION_TYPE,
			}),
		},
		{
			error: () => {
				return UserRouteValidationMessage.ACTUAL_GEOMETRY_REQUIRED;
			},
		},
	),
	routeId: z.number({
		message: UserRouteValidationMessage.ROUTE_ID_INVALID_TYPE,
	}),
});

export { userRoutePatch };
