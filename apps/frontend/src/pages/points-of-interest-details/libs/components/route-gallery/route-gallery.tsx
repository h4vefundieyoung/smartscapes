import { RouteCard } from "~/libs/components/route-card/route-card.js";
import { sortByDate } from "~/libs/helpers/helpers.js";
import { useMemo } from "~/libs/hooks/hooks.js";
import { type PointsOfInterestGetByIdResponseDto } from "~/modules/points-of-interest/points-of-interest.js";

import styles from "./styles.module.css";

type Properties = {
	routes: PointsOfInterestGetByIdResponseDto["routes"];
};

const HALF = 2;

const RoutesGallery = ({ routes }: Properties): React.JSX.Element => {
	const cards = useMemo(
		() =>
			routes.map(({ geometry, id, images, name, pois }) => {
				const cardImage = sortByDate(images, "createdAt").at(0)?.url;
				const coordsCenter = Math.floor(geometry.coordinates.length / HALF);
				const routeCenter = geometry.coordinates[coordsCenter] as [
					number,
					number,
				];

				return (
					<RouteCard
						id={id}
						imageUrl={cardImage}
						key={id}
						mapProps={{
							center: routeCenter,
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
