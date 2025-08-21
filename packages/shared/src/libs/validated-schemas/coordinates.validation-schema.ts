import { z } from "zod";

import {
	CoordinatesValidationMessage,
	CoordinatesValidationRule,
} from "../enums/enums.js";
import { parseToFloat } from "../helpers/helpers.js";

const latitudeSchema = z
	.string()
	.trim()
	.transform(parseToFloat)
	.pipe(
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
	);

const longitudeSchema = z
	.string()
	.trim()
	.transform(parseToFloat)
	.pipe(
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
	);

const coordinateSchema = z.tuple([longitudeSchema, latitudeSchema]);

export { coordinateSchema, latitudeSchema, longitudeSchema };
