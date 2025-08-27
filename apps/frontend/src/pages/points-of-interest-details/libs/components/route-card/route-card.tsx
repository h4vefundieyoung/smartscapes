import imagePlaceholer from "~/assets/images/placeholder-card.jpg";
import { TextLink } from "~/libs/components/components.js";
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
	});

	return (
		<li className={styles["card"]}>
			<TextLink to={routeDetailsUrl}>
				<div className={styles["card-content"]}>
					<img
						alt={name}
						className={styles["image"]}
						src={imageUrl ?? imagePlaceholer}
					/>
					<div className={styles["title"]}>{name}</div>
				</div>
			</TextLink>
		</li>
	);
};

export { RouteCard };
