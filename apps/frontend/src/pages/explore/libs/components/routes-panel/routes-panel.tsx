import React from "react";

import { Loader, RouteCard } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useMemo,
} from "~/libs/hooks/hooks.js";
import { actions as exploreActions } from "~/modules/explore/explore.js";
import { actions as locationActions } from "~/modules/location/location.js";

import styles from "./styles.module.css";

const RoutesPanel = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const error = useAppSelector((state) => state.explore.error);
	const loading = useAppSelector((state) => state.explore.loading);
	const routes = useAppSelector((state) => state.explore.routes);
	const locationError = useAppSelector((state) => state.location.locationError);
	const locationDataStatus = useAppSelector(
		(state) => state.location.dataStatus,
	);
	const location = useAppSelector((state) => state.location.location);

	useEffect(() => {
		void dispatch(locationActions.getCurrentUserLocation());
	}, [dispatch]);

	useEffect(() => {
		if (locationDataStatus === DataStatus.FULFILLED && location !== null) {
			void dispatch(
				exploreActions.getRoutes({
					latitude: location.latitude,
					longitude: location.longitude,
				}),
			);
		}
	}, [locationDataStatus, location, dispatch]);

	const content = useMemo(() => {
		if (loading) {
			return <Loader />;
		}

		if (error || locationError) {
			return <span className={styles["error"]}> {error ?? locationError}</span>;
		}

		if (routes.length === 0) {
			return (
				<div className={styles["list-empty"]}>No routes found nearby.</div>
			);
		}

		return (
			<ul className={styles["list"]}>
				{routes.map((route) => (
					<RouteCard imageUrl={null} key={route.id} name={route.name} />
				))}
			</ul>
		);
	}, [loading, error, locationError, routes]);

	return (
		<div className={styles["container"]}>
			<h3 className={styles["title"]}>Explore routes</h3>
			{content}
		</div>
	);
};

export { RoutesPanel };
