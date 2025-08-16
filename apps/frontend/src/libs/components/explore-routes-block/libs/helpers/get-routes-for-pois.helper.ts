import { unwrapResult } from "@reduxjs/toolkit";

import { type useAppDispatch } from "~/libs/hooks/hooks.js";
import { type RoutesResponseDto } from "~/modules/routes/libs/types/types.js";
import { actions as routesActions } from "~/modules/routes/routes.js";

const getRoutesForPOIs = async (
	dispatch: ReturnType<typeof useAppDispatch>,
): Promise<RoutesResponseDto[]> => {
	const action = await dispatch(routesActions.findAll());

	const result = unwrapResult(action);

	return result.data;
};

export { getRoutesForPOIs };
