import { z } from "zod";

import {
	CoordinatesValidationMessage,
	CoordinatesValidationRule,
	LocationType,
} from "../../../libs/enums/enums.js";
import { UserRouteValidationMessage } from "../libs/enums/enums.js";

const MIN_LINE_STRING_COORDINATES = 2;

const userRoutePatch = z.strictObject({
	actualGeometry: z.object({
		coordinates: z
			.array(
				z.tuple([
					z
						.number()
						.min(
							CoordinatesValidationRule.LONGITUDE_MIN,
							CoordinatesValidationMessage.LONGITUDE_MIN,
						)
						.max(
							CoordinatesValidationRule.LONGITUDE_MAX,
							CoordinatesValidationMessage.LONGITUDE_MAX,
						),
					z
						.number()
						.min(
							CoordinatesValidationRule.LATITUDE_MIN,
							CoordinatesValidationMessage.LATITUDE_MIN,
						)
						.max(
							CoordinatesValidationRule.LATITUDE_MAX,
							CoordinatesValidationMessage.LATITUDE_MAX,
						),
				]),
			)
			.min(MIN_LINE_STRING_COORDINATES, {
				message: "LineString must have at least 2 coordinates",
			}),
		type: z.literal(LocationType.LINE_STRING, {
			message: UserRouteValidationMessage.INVALID_LOCATION_TYPE,
		}),
	}),
	routeId: z.number({
		message: UserRouteValidationMessage.ROUTE_ID_INVALID_TYPE,
	}),
});

export { userRoutePatch };
