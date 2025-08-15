import { unwrapResult } from "@reduxjs/toolkit";

import { type useAppDispatch } from "~/libs/hooks/hooks.js";
import { type PointsOfInterestResponseDto } from "~/modules/points-of-interest/libs/types/types.js";
import { type RoutesResponseDto } from "~/modules/routes/libs/types/types.js";
import { actions as routesActions } from "~/modules/routes/routes.js";

const getRoutesForPOIs = async (
	dispatch: ReturnType<typeof useAppDispatch>,
	pois: PointsOfInterestResponseDto[],
): Promise<RoutesResponseDto[]> => {
	const poiIds = pois.map((poi) => poi.id);

	const action = await dispatch(routesActions.findAll({ poiIds }));

	const result = unwrapResult(action);

	return result.data;
};

export { getRoutesForPOIs };
