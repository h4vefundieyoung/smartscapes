import { Loader } from "~/libs/components/components.js";
import { DataStatus, UserRouteStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as userRoutesActions } from "~/modules/user-routes/user-routes.js";

import { DashboardRouteCard } from "../../card/dashboard-route-card.js";
import styles from "./styles.module.css";

const SavedRoutes = (): null | React.JSX.Element => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(
			userRoutesActions.getAllByUserId(UserRouteStatus.NOT_STARTED),
		);
	}, [dispatch]);

	const savedUserRoutes = useAppSelector(
		(state) => state.userRoutes.userRoutes,
	);

	const dataStatus = useAppSelector((state) => state.userRoutes.dataStatus);

	if (dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE) {
		return <Loader />;
	}

	if (savedUserRoutes.length === 0) {
		return null;
	}

	const cards = savedUserRoutes.map((route) => {
		return <DashboardRouteCard key={route.routeId} route={route} />;
	});

	return <div className={styles["cards-wrapper"]}>{cards}</div>;
};

export { SavedRoutes };
