import { Loader, MapProvider } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppNavigate,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { type UserRouteResponseDto } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type CardProperties = {
	route: UserRouteResponseDto;
};

const Card = ({ route }: CardProperties): React.JSX.Element => {
	const navigate = useAppNavigate();

	const handleClick = useCallback(() => {
		navigate(`/app/routes/${route.id.toString()}`);
	}, [navigate, route]);

	const routeLine = { geometry: route.actualGeometry, id: "actual" };

	return (
		<button className={styles["route-container"]} onClick={handleClick}>
			<h1 className={styles["label"]}>{route.routeName}</h1>
			<MapProvider routeLine={routeLine} />
		</button>
	);
};

const UserHistory = (): React.JSX.Element => {
	const finishedUserRoutes = useAppSelector((state) =>
		state.userRoutes.userRoutes.filter((route) => route.completedAt !== null),
	);

	const dataStatus = useAppSelector((state) => state.userRoutes.dataStatus);

	if (dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE) {
		return <Loader />;
	}

	if (finishedUserRoutes.length === 0) {
		return <></>;
	}

	const cards = finishedUserRoutes.map((route) => {
		return <Card key={route.id} route={route} />;
	});

	return <div className={styles["cards-container"]}>{cards}</div>;
};

export { UserHistory };
