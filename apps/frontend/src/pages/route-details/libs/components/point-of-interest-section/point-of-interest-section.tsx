import { PointOfInterestCard } from "~/libs/components/components.js";
import { type RouteGetByIdResponseDto } from "~/modules/routes/routes.js";

import styles from "./styles.module.css";

type Properties = {
	pointOfInterests: RouteGetByIdResponseDto["pois"];
};

const PointOfInterestSection = ({
	pointOfInterests,
}: Properties): React.JSX.Element => {
	return (
		<section className={styles["section"]}>
			<h2 className={styles["title"]}>Points of interest</h2>
			<ul className={styles["cards"]}>
				{pointOfInterests.map(({ id, name }) => (
					<PointOfInterestCard id={id} key={id} name={name} />
				))}
			</ul>
		</section>
	);
};

export { PointOfInterestSection };
