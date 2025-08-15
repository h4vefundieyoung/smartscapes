import { unwrapResult } from "@reduxjs/toolkit";

import { type useAppDispatch } from "~/libs/hooks/hooks.js";
import { type PointsOfInterestResponseDto } from "~/modules/points-of-interest/libs/types/types.js";
import { actions as pointsOfInterestActions } from "~/modules/points-of-interest/points-of-interest.js";

import { DEFAULT_RADIUS } from "../constants/constants.js";

const getPOIsNearby = async (
	dispatch: ReturnType<typeof useAppDispatch>,
	latitude: number,
	longitude: number,
): Promise<PointsOfInterestResponseDto[]> => {
	const poiAction = await dispatch(
		pointsOfInterestActions.findAll({
			latitude,
			longitude,
			radius: DEFAULT_RADIUS,
		}),
	);

	const result = unwrapResult(poiAction);

	return result.data;
};

export { getPOIsNearby };
