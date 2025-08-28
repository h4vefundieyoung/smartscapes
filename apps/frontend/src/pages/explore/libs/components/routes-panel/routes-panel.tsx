import React from "react";

import { Loader, RouteCard } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { sortByDate } from "~/libs/helpers/helpers.js";
import { useMemo } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type RouteGetAllItemResponseDto } from "~/modules/routes/routes.js";

import styles from "./styles.module.css";

type Properties = {
	locationDataStatus: ValueOf<typeof DataStatus>;
	routes: RouteGetAllItemResponseDto[];
	routesDataStatus: ValueOf<typeof DataStatus>;
	routesError: null | string;
};

const HALF = 2;

const RoutesPanel = ({
	locationDataStatus,
	routes,
	routesDataStatus,
	routesError,
}: Properties): React.JSX.Element => {
	const hasLocationError = locationDataStatus === DataStatus.REJECTED;
	const isRoutesLoading = routesDataStatus === DataStatus.PENDING;

	const content = useMemo(() => {
		if (isRoutesLoading) {
			return (
				<div className={styles["loader-container"]}>
					<Loader />
				</div>
			);
		}

		if (routesError) {
			return <span className={styles["error"]}>{routesError}</span>;
		}

		if (routes.length === 0) {
			return (
				<div className={styles["list-empty"]}>No routes found nearby.</div>
			);
		}

		return (
			<>
				{hasLocationError && (
					<div className={styles["warning"]}>
						Please enable geolocation to see routes near you.
					</div>
				)}

				<ul className={styles["list"]}>
					{routes.map(({ geometry, id, images, name, pois }) => {
						const imageUrl = sortByDate(images, "createdAt").at(0)?.url;
						const coordsCenter = Math.floor(geometry.coordinates.length / HALF);
						const routeCenter = geometry.coordinates[coordsCenter] as [
							number,
							number,
						];

						return (
							<RouteCard
								id={id}
								imageUrl={imageUrl}
								key={id}
								mapProps={{
									center: routeCenter,
									markers: pois.map(({ location }) => location),
									routeLine: { geometry, id: id.toString() },
								}}
								name={name}
							/>
						);
					})}
				</ul>
			</>
		);
	}, [isRoutesLoading, routesError, hasLocationError, routes]);

	return (
		<div className={styles["container"]}>
			<h3 className={styles["title"]}>Explore routes</h3>
			{content}
		</div>
	);
};

export { RoutesPanel };
