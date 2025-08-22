import imagePlaceholer from "~/assets/images/placeholder-card.jpg";
import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	id: number;
	imageUrl?: string;
	name: string;
};

const RouteCard = ({ id, imageUrl, name }: Properties): React.JSX.Element => {
	const routeDetailsUrl = configureString(AppRoute.ROUTES_$ID, {
		id: id.toString(),
	}) as (typeof AppRoute)["ROUTES_$ID"];

	return (
		<li className={styles["card"]}>
			<Link to={routeDetailsUrl}>
				<img
					alt={name}
					className={styles["image"]}
					src={imageUrl ?? imagePlaceholer}
				/>
				<div className={styles["title"]}>{name}</div>
			</Link>
		</li>
	);
};

export { RouteCard };
