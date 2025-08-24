import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { type Coordinates } from "~/libs/types/types.js";
import { actions as pointsOfInterestActions } from "~/modules/points-of-interest/points-of-interest.js";
import { type RouteGetByIdResponseDto } from "~/modules/routes/routes.js";

type Marker = {
	coordinates: Coordinates;
};

type UsePoiLoaderOptions = {
	route: null | RouteGetByIdResponseDto;
};

const useRouteMarker = ({
	route,
}: UsePoiLoaderOptions): { markers: Marker[] } => {
	const dispatch = useAppDispatch();

	const { pointsOfInterest } = useAppSelector(({ pointsOfInterest }) => ({
		pointsOfInterest: pointsOfInterest.data,
	}));

	useEffect(() => {
		if (route) {
			void dispatch(
				pointsOfInterestActions.findAll({
					ids: route.pois.map((poi) => poi.id),
				}),
			);
		}
	}, [route, dispatch]);

	const markers = pointsOfInterest
		.map((poi) => poi.location.coordinates)
		.map((coordinates) => ({ coordinates }));

	return { markers };
};

export { useRouteMarker };
