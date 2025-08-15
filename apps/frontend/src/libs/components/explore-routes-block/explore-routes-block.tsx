import React from "react";

import { useAppDispatch, useEffect, useState } from "~/libs/hooks/hooks.js";

import { RouteCard } from "../components.js";
import {
	getPOIsNearby,
	getRoutesForPOIs,
	mapAndSortRoutes,
} from "./libs/helpers/helpers.js";
import { type RouteItem } from "./libs/types/types.js";
import styles from "./styles.module.css";

// TODO: collect all poi id and create backend api that will accept multiple poi and returns all routes at once

const getCurrentUserPosition = (): Promise<[number, number]> => {
	return new Promise((resolve, reject) => {
		// eslint-disable-next-line sonarjs/no-intrusive-permissions
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve([position.coords.latitude, position.coords.longitude]);
			},
			(error) => {
				reject(new Error(`Failed to get position: ${error.message}`));
			},
		);
	});
};

const ExploreRoutesBlock = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const [routes, setRoutes] = useState<RouteItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const userCoordinates = await getCurrentUserPosition();

				const pois = await getPOIsNearby(dispatch, ...userCoordinates);

				if (pois.length === 0) {
					setRoutes([]);
					setLoading(false);

					return;
				}

				const allRoutes = await getRoutesForPOIs(dispatch, pois);
				const sortedRoutes = mapAndSortRoutes(allRoutes, pois, userCoordinates);

				//TODO: findAll works correctly at the backend, but I need to check how the query is sents by frontend part
				//TODO: examine how does findByPoint works
				//TODO: update algorithm for sorting

				setRoutes(sortedRoutes);
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError("An unknown error occured.");
				}
			} finally {
				setLoading(false);
			}
		};

		void fetchData();
	}, [dispatch]);

	if (loading) {
		return <div className={styles["loading"]}>Loading routes...</div>;
	}

	if (error) {
		return <div className={styles["error"]}>Error: {error}</div>;
	}

	return (
		<div className={styles["container"]}>
			<h3 className={styles["title"]}>Explore routes</h3>
			{routes.length === 0 && (
				<div className={styles["not-found"]}>No routes found nearby.</div>
			)}
			<ul className={styles["list"]}>
				{routes.map((route) => (
					<RouteCard imageUrl={null} key={route.id} name={route.name} />
				))}
			</ul>
		</div>
	);
};

export { ExploreRoutesBlock };
