import { unwrapResult } from "@reduxjs/toolkit";

import { type useAppDispatch } from "~/libs/hooks/hooks.js";
import { type PointsOfInterestResponseDto } from "~/modules/points-of-interest/libs/types/types.js";
import { type RoutesResponseDto } from "~/modules/routes/libs/types/types.js";
import { actions as routesActions } from "~/modules/routes/routes.js";

const getRoutesForPOIs = async (
	dispatch: ReturnType<typeof useAppDispatch>,
	pois: PointsOfInterestResponseDto[],
): Promise<RoutesResponseDto[][]> => {
	const promises = pois.map((poi) =>
		dispatch(routesActions.findAll({ poiId: poi.id })),
	);

	const results = await Promise.all(promises);

	return results.map((action) => unwrapResult(action).data);
};

export { getRoutesForPOIs };
