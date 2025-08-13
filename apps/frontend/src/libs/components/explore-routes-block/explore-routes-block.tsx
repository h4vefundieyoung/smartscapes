import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";

import { useAppDispatch, useEffect, useState } from "~/libs/hooks/hooks.js";
import { type PointsOfInterestResponseDto } from "~/modules/points-of-interest/libs/types/types.js";
import { actions as pointsOfInterestActions } from "~/modules/points-of-interest/points-of-interest.js";
import { type RoutesResponseDto } from "~/modules/routes/libs/types/types.js";
import { actions as routesActions } from "~/modules/routes/routes.js";

import { sortRouteByDistance } from "./libs/helpers/helpers.js";
import { type RouteItem } from "./libs/types/types.js";

// TODO: collect all poi id and create backend api that will accept multiple poi and returns all routes at once

const ONE = 1;
const DEFAULT_RADIUS = 50;
const START_VISIT_ORDER = 0;

const getCurrentUserPosition = (): Promise<[number, number]> => {
	return new Promise((resolve, reject) => {
		// eslint-disable-next-line sonarjs/no-intrusive-permissions
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve([position.coords.longitude, position.coords.latitude]);
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
		const fetchroutes = async (): Promise<void> => {
			try {
				const [longitude, latitude] = await getCurrentUserPosition();

				const poiAction = await dispatch(
					pointsOfInterestActions.findAll({
						latitude,
						longitude,
						radius: DEFAULT_RADIUS,
					}),
				);
				const poiResult = unwrapResult(poiAction);
				const pois: PointsOfInterestResponseDto[] = poiResult.data;

				const poiMap = new Map<number, { lat: number; lon: number }>();

				for (const poi of pois) {
					poiMap.set(poi.id, {
						lat: poi.location.coordinates[0],
						lon: poi.location.coordinates[ONE],
					});
				}

				const routesPromises = [];

				for (const poi of pois) {
					routesPromises.push(dispatch(routesActions.findByPoint(poi.id)));
				}

				const routesResults = await Promise.all(routesPromises);

				const allRoutes: RouteItem[] = [];

				for (const action of routesResults) {
					const response = unwrapResult(action);
					const { data }: { data: RoutesResponseDto[] } = response;

					for (const route of data) {
						const startPOI = route.pois.find(
							(p) => p.visitOrder === START_VISIT_ORDER,
						);
						const coords = startPOI ? (poiMap.get(startPOI.id) ?? null) : null;
						allRoutes.push({ ...route, startingPOICoords: coords });
					}
				}

				const uniqueRoutesMap = new Map<number, RouteItem>();

				for (const route of allRoutes) {
					uniqueRoutesMap.set(route.id, route);
				}

				const uniqueRoutes = sortRouteByDistance(
					[...uniqueRoutesMap.values()],
					[latitude, longitude],
				);

				setRoutes(uniqueRoutes);
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

		void fetchroutes();
	}, [dispatch]);

	if (loading) {
		return <div>Loading routes...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div style={{ maxHeight: "400px", overflowY: "auto" }}>
			{routes.length === 0 && <div>No routes found nearby.</div>}
			<ul>
				{routes.map((route) => (
					<li key={route.id}>
						<strong>{route.name}</strong>
						<p>{route.description}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export { ExploreRoutesBlock };
