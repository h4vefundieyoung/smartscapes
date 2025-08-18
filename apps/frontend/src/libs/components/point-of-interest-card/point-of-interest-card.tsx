import { NavLink } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	id: number;
	imageUrl: null | string;
	name: string;
};

const PointOfInterestCard = ({
	id,
	imageUrl,
	name,
}: Properties): React.JSX.Element => {
	return (
		<li className={styles["card"]}>
			<NavLink
				className={styles["link"] as string}
				to={configureString(AppRoute.POI_$ID, { id: id.toString() })}
			>
				{imageUrl ? (
					<img alt={name} className={styles["image"]} src={imageUrl} />
				) : (
					<div className={styles["image-placeholder"]} />
				)}
				<div className={styles["label"]}>{name}</div>
			</NavLink>
		</li>
	);
};

export { PointOfInterestCard };
