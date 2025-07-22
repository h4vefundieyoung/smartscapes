import { z, type ZodType } from "zod";

import {
	PointsOfInterestValidationMessage,
	PointsOfInterestValidationRule,
} from "../enums/enums.js";
import { type PointsOfInterestRequestDto } from "../types/types.js";

const pointOfInterestCreate: ZodType<PointsOfInterestRequestDto> =
	z.strictObject({
		latitude: z
			.number()
			.min(PointsOfInterestValidationRule.LATITUDE_MINIMUM, {
				message: PointsOfInterestValidationMessage.LATITUDE_MINIMUM,
			})
			.max(PointsOfInterestValidationRule.LATITUDE_MAXIMUM, {
				message: PointsOfInterestValidationMessage.LATITUDE_MAXIMUM,
			}),
		longitude: z
			.number()
			.min(PointsOfInterestValidationRule.LONGITUDE_MINIMUM, {
				message: PointsOfInterestValidationMessage.LONGITUDE_MINIMUM,
			})
			.max(PointsOfInterestValidationRule.LONGITUDE_MAXIMUM, {
				message: PointsOfInterestValidationMessage.LONGITUDE_MAXIMUM,
			}),
		name: z
			.string()
			.min(PointsOfInterestValidationRule.NAME_MINIMUM_LENGTH, {
				message: PointsOfInterestValidationMessage.NAME_MINIMUM_LENGTH,
			})
			.max(PointsOfInterestValidationRule.NAME_MAXIMUM_LENGTH, {
				message: PointsOfInterestValidationMessage.NAME_MAXIMUM_LENGTH,
			}),
	});

export { pointOfInterestCreate };
