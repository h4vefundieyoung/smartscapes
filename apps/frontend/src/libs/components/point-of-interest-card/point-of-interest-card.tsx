import { Link, MapProvider } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useMemo } from "~/libs/hooks/hooks.js";
import { type Coordinates } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	coordinates: Coordinates;
	id: number;
	name: string;
};

const PointOfInterestCard = ({
	coordinates,
	id,
	name,
}: Properties): React.JSX.Element => {
	const markers = useMemo(() => [{ coordinates }], [coordinates]);

	const poiDetailsLink = configureString(AppRoute.POINTS_OF_INTEREST_$ID, {
		id: id.toString(),
	});

	return (
		<li className={styles["card"]}>
			<Link className={styles["link"]} to={poiDetailsLink}>
				<div className={styles["map"]}>
					<MapProvider
						center={coordinates}
						isInteractive={false}
						markers={markers}
						shouldFitToBounds
					/>
				</div>
				<div className={styles["title"]}>{name}</div>
			</Link>
		</li>
	);
};

export { PointOfInterestCard };
