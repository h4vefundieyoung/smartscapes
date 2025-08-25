import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { type LineStringGeometry } from "~/libs/types/types.js";
import { actions as userRouteActions } from "~/modules/user-routes/user-routes.js";

type UseUserRouteHandler = {
	handleFinish: () => void;
	handleStart: () => void;
};

const useUserRouteHandler = (
	routeId: number,
	actualGeometry: LineStringGeometry,
): UseUserRouteHandler => {
	const dispatch = useAppDispatch();

	const handleStart = useCallback(() => {
		void dispatch(
			userRouteActions.start({
				routeId,
			}),
		);
	}, [dispatch, routeId]);

	const handleFinish = useCallback(() => {
		void dispatch(
			userRouteActions.finish({
				payload: { actualGeometry },
				query: { routeId },
			}),
		);
	}, [dispatch, routeId, actualGeometry]);

	return {
		handleFinish,
		handleStart,
	};
};

export { useUserRouteHandler };
