import React from "react";

import { MapProvider } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as exploreActions } from "~/modules/explore/explore.js";
import { actions as locationActions } from "~/modules/location/location.js";

import { RoutesPanel } from "./libs/components/components.js";
import { mockPOIs } from "./mock-pois.js";
import styles from "./styles.module.css";

const Explore = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const routesDataStatus = useAppSelector((state) => state.explore.dataStatus);
	const routesError = useAppSelector((state) => state.explore.error);
	const routes = useAppSelector((state) => state.explore.routes);
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

	return (
		<main className={styles["main"]}>
			<div className={styles["routes-container"]}>
				<RoutesPanel
					locationDataStatus={locationDataStatus}
					routes={routes}
					routesDataStatus={routesDataStatus}
					routesError={routesError}
				/>
			</div>
			<div className={styles["container"]}>
				<MapProvider markers={mockPOIs} />
			</div>
		</main>
	);
};

export { Explore };
