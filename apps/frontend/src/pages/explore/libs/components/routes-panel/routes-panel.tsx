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
	const dataStatus = useAppSelector((state) => state.explore.dataStatus);
	const error = useAppSelector((state) => state.explore.error);
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
		if (locationDataStatus === DataStatus.REJECTED) {
			void dispatch(exploreActions.getRoutes());
		}

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
		if (dataStatus === DataStatus.PENDING) {
			return <Loader />;
		}

		if (error) {
			return <span className={styles["error"]}>{error}</span>;
		}

		if (routes.length === 0) {
			return (
				<div className={styles["list-empty"]}>No routes found nearby.</div>
			);
		}

		return (
			<>
				{locationError?.trim() && (
					<div className={styles["warning"]}>
						<div>Location access failed: {locationError}.</div>
						<div>Please enable geolocation to see routes near you.</div>
					</div>
				)}

				<ul className={styles["list"]}>
					{routes.map((route) => (
						<RouteCard imageUrl={null} key={route.id} name={route.name} />
					))}
				</ul>
			</>
		);
	}, [dataStatus, error, locationError, routes]);

	return (
		<div className={styles["container"]}>
			<h3 className={styles["title"]}>Explore routes</h3>
			{content}
		</div>
	);
};

export { RoutesPanel };
