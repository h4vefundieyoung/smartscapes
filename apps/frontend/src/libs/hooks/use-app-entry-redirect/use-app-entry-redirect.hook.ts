import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppNavigate,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { type NavigationItemsGroup, type ValueOf } from "~/libs/types/types.js";
import { actions as appActions } from "~/modules/app/app.js";

type Parameters = {
	entryRoute: ValueOf<typeof AppRoute>;
	navigationGroups: NavigationItemsGroup[];
};

const useAppEntryRedirect = ({
	entryRoute,
	navigationGroups,
}: Parameters): void => {
	const { pathname } = useLocation();
	const navigate = useAppNavigate();
	const dispatch = useAppDispatch();

	const authDataStatus = useAppSelector(({ auth }) => auth.dataStatus);

	const currentRoute = pathname.replace(/\/$/, "");
	const isEntryRoute = currentRoute === entryRoute;
	const isAuthSettled =
		authDataStatus === DataStatus.FULFILLED ||
		authDataStatus === DataStatus.REJECTED;

	useEffect(() => {
		if (!isAuthSettled) {
			return;
		}

		if (!isEntryRoute) {
			dispatch(appActions.initialize());

			return;
		}

		const [navigationGroup] = navigationGroups;
		const [firstRoute] = navigationGroup?.items ?? [];

		const navigateTo = firstRoute?.href ?? AppRoute.EXPLORE;

		if (navigateTo !== currentRoute) {
			navigate(navigateTo, { replace: true });
		}

		dispatch(appActions.initialize());
	}, [
		isAuthSettled,
		isEntryRoute,
		navigationGroups,
		currentRoute,
		navigate,
		dispatch,
	]);
};

export { useAppEntryRedirect };
