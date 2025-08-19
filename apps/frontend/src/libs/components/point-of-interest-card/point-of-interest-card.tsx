import defaultUrl from "~/assets/images/placeholder-card.jpg";
import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	id: number;
	imageUrl?: string;
	name: string;
};

const PointOfInterestCard = ({
	id,
	imageUrl,
	name,
}: Properties): React.JSX.Element => {
	return (
		<li className={styles["card"]}>
			<Link
				to={configureString(AppRoute.POINTS_OF_INTEREST_$ID, {
					id: id.toString(),
				})}
			>
				<img
					alt={name}
					className={styles["image"]}
					src={imageUrl ?? defaultUrl}
				/>
				<div className={styles["title"]}>{name}</div>
			</Link>
		</li>
	);
};

export { PointOfInterestCard };
