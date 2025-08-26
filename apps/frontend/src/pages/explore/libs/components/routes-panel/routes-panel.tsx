import React from "react";

import {
	Loader,
	RouteCard,
	RouteMapPopup,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useCallback,
	useEffect,
	useMapClient,
	useMemo,
	useRef,
} from "~/libs/hooks/hooks.js";
import { type MapMarker } from "~/libs/modules/map-client/libs/types/types.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type RouteGetAllItemResponseDto } from "~/modules/routes/routes.js";

import styles from "./styles.module.css";

type Properties = {
	locationDataStatus: ValueOf<typeof DataStatus>;
	routes: RouteGetAllItemResponseDto[];
	routesDataStatus: ValueOf<typeof DataStatus>;
	routesError: null | string;
};

const RoutesPanel = ({
	locationDataStatus,
	routes,
	routesDataStatus,
	routesError,
}: Properties): React.JSX.Element => {
	const hasLocationError = locationDataStatus === DataStatus.REJECTED;
	const isRoutesLoading = routesDataStatus === DataStatus.PENDING;

	const mapClient = useMapClient();
	const currentMarkerReference = useRef<MapMarker | null>(null);

	const clearCurrentMarker = useCallback((): void => {
		if (currentMarkerReference.current) {
			currentMarkerReference.current.remove();
			currentMarkerReference.current = null;
		}
	}, []);

	useEffect(() => {
		return (): void => {
			clearCurrentMarker();
		};
	}, [clearCurrentMarker]);

	const createMarkerWithPopup = useCallback(
		(
			coordinates: [number, number],
			route: RouteGetAllItemResponseDto,
		): void => {
			const newMarker = mapClient.addMarker({ coordinates });

			if (newMarker) {
				newMarker.addPopup(<RouteMapPopup route={route} />);
				currentMarkerReference.current = newMarker;
			} else {
				currentMarkerReference.current = null;
			}
		},
		[mapClient],
	);

	const navigateToRoute = useCallback(
		(route: RouteGetAllItemResponseDto): void => {
			const [longitude, latitude] = route.geometry.coordinates[0] ?? [];

			if (!longitude || !latitude) {
				return;
			}

			clearCurrentMarker();
			mapClient.flyTo([longitude, latitude]);
			createMarkerWithPopup([longitude, latitude], route);
		},
		[mapClient, clearCurrentMarker, createMarkerWithPopup],
	);

	const handleRouteCardClick = useCallback(
		(routeId: number) => (): void => {
			const route = routes.find((route) => route.id === routeId);

			if (!route?.geometry.coordinates.length) {
				return;
			}

			navigateToRoute(route);
		},
		[routes, navigateToRoute],
	);

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
		isRoutesLoading,
		routesError,
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
