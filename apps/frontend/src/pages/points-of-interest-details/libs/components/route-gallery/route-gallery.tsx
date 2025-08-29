import { useMemo } from "~/libs/hooks/hooks.js";
import { type PointsOfInterestGetByIdResponseDto } from "~/modules/points-of-interest/points-of-interest.js";

import { RouteCard } from "../route-card/route-card.js";
import styles from "./styles.module.css";

type Properties = {
	routes: PointsOfInterestGetByIdResponseDto["routes"];
};

const RoutesGallery = ({ routes }: Properties): React.JSX.Element => {
	const cards = useMemo(
		() =>
			routes.map(({ coverImage, geometry, id, name, pois }) => {
				return (
					<RouteCard
						id={id}
						imageUrl={coverImage}
						key={id}
						mapProps={{
							markers: pois.map(({ location }) => location),
							routeLine: { geometry, id: id.toString() },
						}}
						name={name}
					/>
				);
			}),
		[routes],
	);

	return (
		<section className={styles["section"]}>
			<h2 className={styles["title"]}>Routes</h2>
			<ul className={styles["cards-list"]}>{cards}</ul>
		</section>
	);
};

export { RoutesGallery };
