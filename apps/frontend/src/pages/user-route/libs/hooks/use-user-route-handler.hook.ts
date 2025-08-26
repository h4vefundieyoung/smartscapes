import { LocationType } from "@smartscapes/shared";

import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import {
	getActualCoordinatesFromStorage,
	actions as userRouteActions,
} from "~/modules/user-routes/user-routes.js";

type UseUserRouteHandler = {
	handleFinish: () => void;
	handleStart: () => void;
};

const useUserRouteHandler = (routeId: number): UseUserRouteHandler => {
	const dispatch = useAppDispatch();

	const handleStart = useCallback(() => {
		void dispatch(
			userRouteActions.start({
				routeId,
			}),
		);
	}, [dispatch, routeId]);

	const handleFinish = useCallback(async () => {
		void dispatch(userRouteActions.stopTrackingRoute());

		const coordinates = await getActualCoordinatesFromStorage();

		void dispatch(
			userRouteActions.finish({
				payload: {
					actualGeometry: {
						coordinates,
						type: LocationType.LINE_STRING,
					},
				},
				query: { routeId },
			}),
		);
	}, [dispatch, routeId]);

	return {
		handleFinish,
		handleStart,
	};
};

export { useUserRouteHandler };
