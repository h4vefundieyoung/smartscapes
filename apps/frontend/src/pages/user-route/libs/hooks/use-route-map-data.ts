import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { type MapMarkerOptions } from "~/libs/modules/map-client/map-client.js";
import { type RouteLine } from "~/libs/types/route-line.type.js";
import { actions as pointsOfInterestActions } from "~/modules/points-of-interest/points-of-interest.js";
import { actions as routeDetailsActions } from "~/modules/routes/routes.js";

type MapData = {
	markers: { coordinates: MapMarkerOptions["coordinates"] }[];
	routeLine: RouteLine;
};

const useRouteMapData = (routeId: number): MapData => {
	const dispatch = useAppDispatch();

	const { pointsOfInterest, route } = useAppSelector(
		({ pointsOfInterest, routeDetails }) => ({
			pointsOfInterest: pointsOfInterest.data,
			route: routeDetails.route,
		}),
	);

	useEffect(() => {
		if (!route) {
			void dispatch(routeDetailsActions.getById(routeId));
		}
	}, [route, routeId, dispatch]);

	useEffect(() => {
		if (route) {
			void dispatch(
				pointsOfInterestActions.findAll({
					ids: route.pois.map((poi) => poi.id),
				}),
			);
		}
	}, [route, dispatch]);

	const markers = pointsOfInterest.map((poi) => ({
		coordinates: poi.location.coordinates,
	}));

	return {
		markers,
		routeLine: {
			geometry: route?.geometry ?? { coordinates: [], type: "LineString" },
			id: String(routeId),
		},
	};
};

export { useRouteMapData };
