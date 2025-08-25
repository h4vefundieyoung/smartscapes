import React from "react";

import {
	Loader,
	RouteCard,
	RouteMapPopup,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useMapClient,
	useMemo,
	useRef,
} from "~/libs/hooks/hooks.js";
import { type MapMarker } from "~/libs/modules/map-client/libs/types/types.js";
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

	const mapClient = useMapClient();
	const currentMarkerReference = useRef<MapMarker | null>(null);

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

	useEffect(() => {
		return (): void => {
			if (currentMarkerReference.current) {
				currentMarkerReference.current.remove();
				currentMarkerReference.current = null;
			}
		};
	}, []);

	const handleRouteCardClick = useCallback(
		(routeId: number) => (): void => {
			const route = routes.find((r) => r.id === routeId);

			if (!route || route.geometry.coordinates.length === 0) {
				return;
			}

			const [firstCoordinate] = route.geometry.coordinates;

			if (firstCoordinate) {
				const [longitude, latitude] = firstCoordinate;

				if (longitude && latitude) {
					if (currentMarkerReference.current) {
						currentMarkerReference.current.remove();
						currentMarkerReference.current = null;
					}

					mapClient.flyTo([longitude, latitude]);

					const newMarker = mapClient.addMarker({
						coordinates: [longitude, latitude],
					});

					if (newMarker) {
						newMarker.addPopup(<RouteMapPopup route={route} />);
						currentMarkerReference.current = newMarker;
					} else {
						currentMarkerReference.current = null;
					}
				}
			}
		},
		[routes, mapClient],
	);

	const hasLocationError = Boolean(locationError);

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
				{hasLocationError && (
					<div className={styles["warning"]}>
						<div>Location access failed: {locationError}.</div>
						<div>Please enable geolocation to see routes near you.</div>
					</div>
				)}

				<ul className={styles["list"]}>
					{routes.map((route) => (
						<RouteCard
							imageUrl={null}
							key={route.id}
							name={route.name}
							onClick={handleRouteCardClick(route.id)}
						/>
					))}
				</ul>
			</>
		);
	}, [
		dataStatus,
		error,
		locationError,
		hasLocationError,
		routes,
		handleRouteCardClick,
	]);

	return (
		<div className={styles["container"]}>
			<h3 className={styles["title"]}>Explore routes</h3>
			{content}
		</div>
	);
};

export { RoutesPanel };
