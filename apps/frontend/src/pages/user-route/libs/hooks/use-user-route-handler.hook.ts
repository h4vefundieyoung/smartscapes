import { LocationType } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { actions as userRouteActions } from "~/modules/user-routes/user-routes.js";

type UseUserRouteHandler = {
	handleFinish: () => void;
	handleStart: () => void;
};

const useUserRouteHandler = (routeId: number): UseUserRouteHandler => {
	const dispatch = useAppDispatch();
	const actualPath = useAppSelector(
		(state) => state.userRouteDetails.actualPath,
	);

	const handleStart = useCallback(() => {
		void dispatch(
			userRouteActions.start({
				routeId,
			}),
		);
	}, [dispatch, routeId]);

	const handleFinish = useCallback(() => {
		void dispatch(userRouteActions.stopTrackingRoute());

		void dispatch(
			userRouteActions.finish({
				payload: {
					actualGeometry: {
						coordinates: actualPath,
						type: LocationType.LINE_STRING,
					},
				},
				query: { routeId },
			}),
		);
	}, [dispatch, routeId, actualPath]);

	return {
		handleFinish,
		handleStart,
	};
};

export { useUserRouteHandler };
