import { Loader } from "~/libs/components/components.js";
import { DataStatus, UserRouteStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as userRoutesActions } from "~/modules/user-routes/user-routes.js";

import styles from "./styles.module.css";
import { UserHistoryCard } from "./user-history-card.js";

const UserHistory = (): null | React.JSX.Element => {
	const dispatch = useAppDispatch();
	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);

	useEffect(() => {
		if (authenticatedUser) {
			void dispatch(
				userRoutesActions.getAllByUserId({
					id: authenticatedUser.id,
					status: UserRouteStatus.COMPLETED,
				}),
			);
		}
	}, [authenticatedUser, dispatch]);

	const finishedUserRoutes = useAppSelector(
		(state) => state.userRoutes.userRoutes,
	);

	const dataStatus = useAppSelector((state) => state.userRoutes.dataStatus);

	if (dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE) {
		return <Loader />;
	}

	if (finishedUserRoutes.length === 0) {
		return null;
	}

	const cards = finishedUserRoutes.map((route) => {
		return <UserHistoryCard key={route.id} route={route} />;
	});

	return <div className={styles["cards-wrapper"]}>{cards}</div>;
};

export { UserHistory };
