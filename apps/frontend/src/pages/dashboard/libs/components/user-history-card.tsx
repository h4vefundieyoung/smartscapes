import { MapProvider } from "~/libs/components/components.js";
import { useAppNavigate, useCallback } from "~/libs/hooks/hooks.js";
import { type UserRouteResponseDto } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type CardProperties = {
	route: UserRouteResponseDto;
};

const UserHistoryCard = ({ route }: CardProperties): React.JSX.Element => {
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

export { UserHistoryCard };
