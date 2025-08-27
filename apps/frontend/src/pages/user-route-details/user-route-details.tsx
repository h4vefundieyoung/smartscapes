import { Button, Loader, MapProvider } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useMemo,
	useParams,
} from "~/libs/hooks/hooks.js";
import { type RouteLine } from "~/libs/types/route-line.type.js";
import { type Coordinates } from "~/libs/types/types.js";
import { actions as pointsOfInterestActions } from "~/modules/points-of-interest/points-of-interest.js";
import { actions as routeDetailsActions } from "~/modules/routes/routes.js";

import {
	useUserRouteHandler,
	useUserRouteNavigation,
	useUserRouteState,
} from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

type MapProperties = {
	center: Coordinates;
	markers: { coordinates: Coordinates }[];
	routeLine: null | RouteLine;
};

const UserRouteDetails = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const { routeId } = useParams<{ routeId: string }>();

	const { isRouteLoading } = useAppSelector(({ routeDetails }) => ({
		isRouteLoading: routeDetails.dataStatus === DataStatus.PENDING,
	}));

	const pointsOfInterest = useAppSelector(
		({ pointsOfInterest }) => pointsOfInterest.data,
	);

	const { isUserRouteActive, isUserRouteCompleted, isUserRouteLoading } =
		useUserRouteState(Number(routeId));
	const { handleFinish, handleStart } = useUserRouteHandler(Number(routeId));

	const isLoading = isRouteLoading || isUserRouteLoading;

	const route = useAppSelector(({ routeDetails }) => routeDetails.route);

	useEffect(() => {
		if (!route) {
			void dispatch(routeDetailsActions.getById(Number(routeId)));
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

	const mapProperties = useMemo((): MapProperties | null => {
		if (!route) {
			return null;
		}

		return {
			center: pointsOfInterest[0]?.location.coordinates || [0, 0],
			markers: pointsOfInterest.map((poi) => ({
				coordinates: poi.location.coordinates,
			})),
			routeLine: {
				geometry: route.geometry,
				id: String(routeId),
			},
		};
	}, [route, pointsOfInterest, routeId]);

	useUserRouteNavigation({ isUserRouteCompleted, routeId: routeId as string });

	return (
		<div className={styles["container"]}>
			{isLoading ? (
				<div className={styles["loader-container"]}>
					<Loader />
				</div>
			) : (
				<MapProvider {...mapProperties}>
					<div className={styles["button-container"]}>
						{isUserRouteActive ? (
							<Button label="Finish" onClick={handleFinish} />
						) : (
							<Button label="Start" onClick={handleStart} />
						)}
					</div>
				</MapProvider>
			)}
		</div>
	);
};

export { UserRouteDetails };
