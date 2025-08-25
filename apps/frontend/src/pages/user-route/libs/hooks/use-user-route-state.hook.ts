import { DataStatus } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { UserRouteStatus } from "~/modules/user-routes/user-routes.js";

type UseUserRouteStateReturn = {
	isRouteLoading: boolean;
	isUserRouteActive: boolean;
	isUserRouteCompleted: boolean;
};

const useUserRouteState = (): UseUserRouteStateReturn => {
	const { isRouteLoading, userRouteDetails } = useAppSelector(
		({ routeDetails, userRouteDetails }) => ({
			isRouteLoading: routeDetails.dataStatus === DataStatus.PENDING,
			userRouteDetails: userRouteDetails.userRouteDetails,
		}),
	);

	const isUserRouteActive = userRouteDetails?.status === UserRouteStatus.ACTIVE;
	const isUserRouteCompleted =
		userRouteDetails?.status === UserRouteStatus.COMPLETED;

	return {
		isRouteLoading,
		isUserRouteActive,
		isUserRouteCompleted,
	};
};

export { useUserRouteState };
