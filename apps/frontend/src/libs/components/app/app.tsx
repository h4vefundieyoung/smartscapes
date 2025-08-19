import {
	AppLayout,
	Loader,
	Modal,
	RouterOutlet,
} from "~/libs/components/components.js";
import { NAVIGATION_ITEMS_GROUPS } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getPermittedNavigationItems } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppEntryRedirect,
	useAppSelector,
	useEffect,
	useMemo,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

import styles from "./styles.module.css";

const App = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const isInitialized = useAppSelector(({ app }) => app.isInitialized);
	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);

	const permittedNavigationGroups = useMemo(() => {
		return getPermittedNavigationItems(
			Boolean(authenticatedUser),
			NAVIGATION_ITEMS_GROUPS,
			authenticatedUser?.group.permissions ?? [],
		);
	}, [authenticatedUser]);

	useEffect(() => {
		void dispatch(authActions.getAuthenticatedUser());
	}, [dispatch]);

	useAppEntryRedirect({
		entryRoute: AppRoute.APP,
		navigationGroups: permittedNavigationGroups,
	});

	if (!isInitialized) {
		return (
			<div className={styles["loader-container"]}>
				<Loader />
			</div>
		);
	}

	return (
		<AppLayout excludedRoutes={[AppRoute.SIGN_IN, AppRoute.SIGN_UP]}>
			<RouterOutlet />
			<Modal />
		</AppLayout>
	);
};

export { App };
