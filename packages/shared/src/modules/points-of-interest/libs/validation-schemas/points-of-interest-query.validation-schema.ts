import { z } from "zod";

import {
	CoordinatesValidationMessage,
	CoordinatesValidationRule,
} from "../../../../libs/enums/enums.js";
import { parseToFloat } from "../../../../libs/helpers/helpers.js";
import {
	PointsOfInterestValidationMessage,
	PointsOfInterestValidationRule,
} from "../enums/enums.js";

const pointsOfInterestQuery = z
	.object({
		latitude: z
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
			)
			.optional(),
		longitude: z
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
			)
			.optional(),
		name: z
			.string()
			.trim()
			.min(
				PointsOfInterestValidationRule.NAME_MIN_LENGTH,
				PointsOfInterestValidationMessage.NAME_MINIMUM_LENGTH,
			)
			.max(
				PointsOfInterestValidationRule.NAME_MAX_LENGTH,
				PointsOfInterestValidationMessage.NAME_MAXIMUM_LENGTH,
			)
			.optional(),
		page: z
			.string()
			.trim()
			.transform(parseToFloat)
			.pipe(
				z
					.number()
					.min(
						PointsOfInterestValidationRule.MIN_PAGE,
						PointsOfInterestValidationMessage.PAGE_MUST_BE_GREATER_THAN_ZERO,
					),
			)
			.optional(),
		perPage: z
			.string()
			.trim()
			.transform(parseToFloat)
			.pipe(
				z
					.number()
					.min(
						PointsOfInterestValidationRule.MIN_PER_PAGE,
						PointsOfInterestValidationMessage.PER_PAGE_MUST_BE_GREATER_THAN_ZERO,
					),
			)
			.optional(),
		radius: z
			.string()
			.transform(parseToFloat)
			.pipe(
				z
					.number()
					.min(
						PointsOfInterestValidationRule.RADIUS_MIN_KM,
						PointsOfInterestValidationMessage.RADIUS_MIN_KM,
					)
					.max(
						PointsOfInterestValidationRule.RADIUS_MAX_KM,
						PointsOfInterestValidationMessage.RADIUS_MAX_KM,
					),
			)
			.optional(),
		search: z.string().trim().optional(),
	})
	.refine(
		({ latitude, longitude, radius }) =>
			!radius || (latitude !== undefined && longitude !== undefined),
		{
			message: PointsOfInterestValidationMessage.COORDS_REQUIRED_WITH_RADIUS,
		},
	)
	.refine(
		({ latitude, longitude }) =>
			(latitude !== undefined) === (longitude !== undefined),
		{
			message: PointsOfInterestValidationMessage.COORDS_REQUIRED_TOGETHER,
		},
	)
	.refine(
		({ page, perPage }) => (page !== undefined) === (perPage !== undefined),
		{
			message:
				PointsOfInterestValidationMessage.PAGINATION_PARAMS_REQUIRED_TOGETHER,
		},
	);

export { pointsOfInterestQuery };
