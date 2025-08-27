import { Link, MapProvider } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { type UserRouteResponseDto } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	route: UserRouteResponseDto;
};

const UserHistoryCard = ({ route }: Properties): React.JSX.Element => {
	const routeLine = { geometry: route.actualGeometry, id: route.routeName };

	return (
		<Link
			className={styles["card"]}
			to={configureString(AppRoute.ROUTES_$ID, { id: route.id.toString() })}
		>
			<h2 className={styles["label"]}>{route.routeName}</h2>
			<MapProvider routeLine={routeLine} />
		</Link>
	);
};

export { UserHistoryCard };
