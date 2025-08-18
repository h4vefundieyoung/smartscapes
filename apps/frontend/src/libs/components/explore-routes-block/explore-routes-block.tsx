import React from "react";

import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as exploreActions } from "~/modules/explore/explore.js";
import { actions as locationActions } from "~/modules/location/location.js";

import { Loader, RouteCard } from "../components.js";
import styles from "./styles.module.css";

const ExploreRoutesBlock = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const { error, loading, routes } = useAppSelector((state) => state.explore);
	const locationError = useAppSelector((state) => state.location.locationError);
	const locationDataStatus = useAppSelector(
		(state) => state.location.dataStatus,
	);

	useEffect(() => {
		void dispatch(locationActions.getCurrentUserLocation());
	}, [dispatch]);

	useEffect(() => {
		if (locationDataStatus === DataStatus.FULFILLED) {
			void dispatch(exploreActions.getRoutes());
		}
	}, [locationDataStatus, dispatch]);

	let content;

	if (loading) {
		content = (
			<div className={styles["loading"]}>
				<Loader />
			</div>
		);
	} else if (error || locationError) {
		content = (
			<div className={styles["error"]}>Error: {error ?? locationError}</div>
		);
	} else {
		content =
			routes.length === 0 ? (
				<div className={styles["not-found"]}>No routes found nearby.</div>
			) : (
				<ul className={styles["list"]}>
					{routes.map((route) => (
						<RouteCard imageUrl={null} key={route.id} name={route.name} />
					))}
				</ul>
			);
	}

	return (
		<div className={styles["container"]}>
			<h3 className={styles["title"]}>Explore routes</h3>
			{content}
		</div>
	);
};

export { ExploreRoutesBlock };
