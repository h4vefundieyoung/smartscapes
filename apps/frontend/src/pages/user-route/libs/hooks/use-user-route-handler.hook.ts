import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { type RouteGetByIdResponseDto } from "~/modules/routes/routes.js";
import { actions as userRouteActions } from "~/modules/user-routes/user-routes.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

type UseUserRouteHandler = {
	handleFinish: () => void;
	handleStart: () => void;
};

const useUserRouteHandler = (
	user: UserAuthResponseDto,
	routeId: number,
	route: RouteGetByIdResponseDto,
): UseUserRouteHandler => {
	const dispatch = useAppDispatch();

	const handleStart = useCallback(() => {
		void dispatch(
			userRouteActions.start({
				payload: {
					routeId,
				},
				userId: user.id,
			}),
		);
	}, [dispatch, routeId, user.id]);

	const handleFinish = useCallback(() => {
		void dispatch(
			userRouteActions.finish({
				payload: {
					actualGeometry: route.geometry,
					routeId,
				},
				userId: user.id,
			}),
		);
	}, [dispatch, routeId, user.id, route.geometry]);

	return {
		handleFinish,
		handleStart,
	};
};

export { useUserRouteHandler };
