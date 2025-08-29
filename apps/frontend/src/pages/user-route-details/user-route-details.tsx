import { type ComponentProps } from "react";

import { Button, Loader, MapProvider } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useMemo,
	useParams,
} from "~/libs/hooks/hooks.js";
import { actions as pointsOfInterestActions } from "~/modules/points-of-interest/points-of-interest.js";
import { actions as routeDetailsActions } from "~/modules/routes/routes.js";

import {
	useUserRouteHandler,
	useUserRouteNavigation,
	useUserRouteState,
} from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

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

	const mapProperties = useMemo((): ComponentProps<
		typeof MapProvider
	> | null => {
		if (!route) {
			return null;
		}

		return {
			markers: pointsOfInterest.map((poi) => ({
				coordinates: poi.location.coordinates,
			})),
			routeLine: {
				geometry: route.geometry,
				id: String(routeId),
			},
			shouldZoomOnGeolocate: true,
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
