import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { type RouteLine } from "~/libs/types/route-line.type.js";
import { type Coordinates } from "~/libs/types/types.js";
import { actions as pointsOfInterestActions } from "~/modules/points-of-interest/points-of-interest.js";
import { actions as routeDetailsActions } from "~/modules/routes/routes.js";

type MapProperties = {
	center: Coordinates;
	markers: { coordinates: Coordinates }[];
	routeLine: RouteLine;
};

const useRouteMapProperties = (routeId: number): MapProperties | null => {
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

	if (!route || markers.length === 0) {
		return null;
	}

	const center = markers[0]?.coordinates;

	const routeLine: RouteLine = {
		geometry: route.geometry,
		id: String(routeId),
	};

	if (!center) {
		return null;
	}

	return {
		center,
		markers,
		routeLine,
	};
};

export { useRouteMapProperties };
