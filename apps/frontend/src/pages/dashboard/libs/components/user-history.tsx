import { Loader } from "~/libs/components/components.js";
import { DataStatus, UserRouteStatus } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";
import { UserHistoryCard } from "./user-history-card.js";

const UserHistory = (): React.JSX.Element => {
	const finishedUserRoutes = useAppSelector((state) =>
		state.userRoutes.userRoutes.filter(
			(route) => route.status === UserRouteStatus.COMPLETED,
		),
	);

	const dataStatus = useAppSelector((state) => state.userRoutes.dataStatus);

	if (dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE) {
		return <Loader />;
	}

	if (finishedUserRoutes.length === 0) {
		return <></>;
	}

	const cards = finishedUserRoutes.map((route) => {
		return <UserHistoryCard key={route.id} route={route} />;
	});

	return <div className={styles["cards-wrapper"]}>{cards}</div>;
};

export { UserHistory };
