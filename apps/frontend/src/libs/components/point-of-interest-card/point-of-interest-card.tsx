import defaultUrl from "~/assets/images/placeholder-card.jpg";
import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	id: number;
	imageUrl?: string;
	name: string | undefined;
};

const PointOfInterestCard = ({
	id,
	imageUrl,
	name,
}: Properties): React.JSX.Element => {
	const poiDetailsLink = configureString(AppRoute.POINTS_OF_INTEREST_$ID, {
		id: id.toString(),
	});

	return (
		<li className={styles["card"]}>
			<Link to={poiDetailsLink}>
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
