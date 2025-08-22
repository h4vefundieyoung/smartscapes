import { type PointsOfInterestWithRoutesDto } from "~/modules/points-of-interest/points-of-interest.js";

import { RouteCard } from "../route-card/route-card.js";
import styles from "./styles.module.css";

type Properties = {
	routes: PointsOfInterestWithRoutesDto["routes"];
};

const RoutesGallery = ({ routes }: Properties): React.JSX.Element => {
	return (
		<section className={styles["section"]}>
			<h2 className={styles["title"]}>Routes</h2>
			<ul className={styles["cards"]}>
				{routes.map(({ id, name }) => (
					<RouteCard id={id} key={id} name={name} />
				))}
			</ul>
		</section>
	);
};

export { RoutesGallery };
