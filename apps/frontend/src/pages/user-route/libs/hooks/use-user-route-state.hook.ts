import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import {
	actions as routeActions,
	type RouteGetByIdResponseDto,
} from "~/modules/routes/routes.js";
import {
	actions as userRouteActions,
	UserRouteStatus,
} from "~/modules/user-routes/user-routes.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

type UseUserRouteStateProperties = {
	routeId: number;
	user: UserAuthResponseDto;
};

type UseUserRouteStateReturn = {
	isRouteLoading: boolean;
	isUserRouteActive: boolean;
	isUserRouteCompleted: boolean;
	route: RouteGetByIdResponseDto;
};

const useUserRouteState = ({
	routeId,
	user,
}: UseUserRouteStateProperties): UseUserRouteStateReturn => {
	const dispatch = useAppDispatch();

	const { isRouteLoading, isRouteNotLoaded, route, userRouteDetails } =
		useAppSelector(({ routeDetails, userRouteDetails }) => ({
			isRouteLoading: routeDetails.dataStatus === DataStatus.PENDING,
			isRouteNotLoaded: routeDetails.dataStatus === DataStatus.IDLE,
			route: routeDetails.route,
			userRouteDetails: userRouteDetails.userRouteDetails,
		}));

	const isUserRouteActive = userRouteDetails?.status === UserRouteStatus.ACTIVE;
	const isUserRouteCompleted =
		userRouteDetails?.status === UserRouteStatus.COMPLETED;

	useEffect(() => {
		if (isRouteNotLoaded) {
			void dispatch(routeActions.getById(routeId));
		}

		void dispatch(
			userRouteActions.getByRouteIdAndUserId({
				payload: {
					routeId,
				},
				userId: user.id,
			}),
		);
	}, [dispatch, isRouteNotLoaded, routeId, user.id]);

	return {
		isRouteLoading,
		isUserRouteActive,
		isUserRouteCompleted,
		route: route as RouteGetByIdResponseDto,
	};
};

export { useUserRouteState };
