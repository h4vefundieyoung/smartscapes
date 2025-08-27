import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import {
	actions as userRouteActions,
	UserRouteStatus,
} from "~/modules/user-routes/user-routes.js";

type UseUserRouteStateReturn = {
	isUserRouteActive: boolean;
	isUserRouteCompleted: boolean;
	isUserRouteLoading: boolean;
};

const useUserRouteState = (routeId: number): UseUserRouteStateReturn => {
	const dispatch = useAppDispatch();

	const { userRouteDetails, userRouteDetailsDataStatus } = useAppSelector(
		({ userRouteDetails }) => ({
			userRouteDetails: userRouteDetails.userRouteDetails,
			userRouteDetailsDataStatus: userRouteDetails.userRouteDetailsDataStatus,
		}),
	);

	const isUserRouteLoading = userRouteDetailsDataStatus === DataStatus.PENDING;
	const isUserRouteActive = userRouteDetails?.status === UserRouteStatus.ACTIVE;
	const isUserRouteCompleted =
		userRouteDetails?.status === UserRouteStatus.COMPLETED;

	useEffect(() => {
		if (!userRouteDetails && userRouteDetailsDataStatus === DataStatus.IDLE) {
			void dispatch(userRouteActions.getByRouteId({ routeId }));
		}
	}, [dispatch, routeId, userRouteDetails, userRouteDetailsDataStatus]);

	useEffect(() => {
		if (isUserRouteActive) {
			void dispatch(userRouteActions.startTrackingRoute());
		}
	}, [dispatch, userRouteDetails?.status]);

	return {
		isUserRouteActive,
		isUserRouteCompleted,
		isUserRouteLoading,
	};
};

export { useUserRouteState };
