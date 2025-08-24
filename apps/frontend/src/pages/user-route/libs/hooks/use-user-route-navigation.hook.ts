import { useAppNavigate, useEffect } from "~/libs/hooks/hooks.js";

const GO_BACK_STEPS = -1;

type UseUserRouteNavigationProperties = {
	isUserRouteCompleted: boolean;
};

const useUserRouteNavigation = ({
	isUserRouteCompleted,
}: UseUserRouteNavigationProperties): void => {
	const navigate = useAppNavigate();

	useEffect(() => {
		if (isUserRouteCompleted) {
			navigate(GO_BACK_STEPS);
		}
	}, [isUserRouteCompleted, navigate]);
};

export { useUserRouteNavigation };
