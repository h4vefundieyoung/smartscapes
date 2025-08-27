import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useAppNavigate, useEffect } from "~/libs/hooks/hooks.js";

type UseUserRouteNavigationProperties = {
	isUserRouteCompleted: boolean;
	routeId: string;
};

const useUserRouteNavigation = ({
	isUserRouteCompleted,
	routeId,
}: UseUserRouteNavigationProperties): void => {
	const navigate = useAppNavigate();

	useEffect(() => {
		if (isUserRouteCompleted) {
			navigate(configureString(AppRoute.ROUTES_$ID, { id: routeId }));
		}
	}, [isUserRouteCompleted, navigate]);
};

export { useUserRouteNavigation };
