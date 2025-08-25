import { DataStatus } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

type UseRouteStateReturn = {
	isRouteLoading: boolean;
};

const useRouteState = (): UseRouteStateReturn => {
	const { isRouteLoading } = useAppSelector(({ routeDetails }) => ({
		isRouteLoading: routeDetails.dataStatus === DataStatus.PENDING,
	}));

	return {
		isRouteLoading,
	};
};

export { useRouteState };
