import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { type MapMarkerOptions } from "~/libs/modules/map-client/map-client.js";
import { actions as pointsOfInterestActions } from "~/modules/points-of-interest/points-of-interest.js";
import { type RouteGetAllItemResponseDto } from "~/modules/routes/routes.js";

type RouteMarker = {
	coordinates: MapMarkerOptions["coordinates"];
};

const useRouteMarker = (
	pois: RouteGetAllItemResponseDto["pois"],
): RouteMarker[] => {
	const dispatch = useAppDispatch();

	const { pointsOfInterest } = useAppSelector(({ pointsOfInterest }) => ({
		pointsOfInterest: pointsOfInterest.data,
	}));

	useEffect(() => {
		void dispatch(
			pointsOfInterestActions.findAll({
				ids: pois.map((poi) => poi.id),
			}),
		);
	}, [pois, dispatch]);

	const markers = pointsOfInterest
		.map((poi) => poi.location.coordinates)
		.map((coordinates) => ({ coordinates }));

	return markers;
};

export { useRouteMarker };
