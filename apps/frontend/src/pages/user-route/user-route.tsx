import { Button, Loader, MapProvider } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppNavigate,
	useAppSelector,
	useEffect,
	useParams,
	useState,
} from "~/libs/hooks/hooks.js";
import { type RouteLine } from "~/libs/types/types.js";
import { actions as routeActions } from "~/modules/routes/routes.js";
import { UserRouteStatus } from "~/modules/user-routes/user-routes.js";

import { useRouteMarker, useUserRouteHandler } from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

const GO_BACK_STEPS = -1;

const UserRoute = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useAppNavigate();
	const { id } = useParams<{ id: string }>();
	const routeId = Number(id);
	const [routeLine, setRouteLine] = useState<null | RouteLine>(null);
	const [isStarted, setIsStarted] = useState<boolean>(false);

	const { route, routeDataStatus, user, userRoute, userRouteFinishDataStatus } =
		useAppSelector(({ auth, route, userRoute }) => ({
			route: route.route,
			routeDataStatus: route.dataStatus,
			user: auth.authenticatedUser,
			userRoute:
				userRoute.userRoutes.find(
					(userRoute) => userRoute.routeId === routeId,
				) || null,
			userRouteFinishDataStatus: userRoute.finishStatus,
		}));

	const { markers } = useRouteMarker({ route });

	const { handleFinish, handleStart } = useUserRouteHandler(
		user,
		routeId,
		route,
	);

	useEffect(() => {
		if (routeDataStatus === DataStatus.IDLE && routeId) {
			void dispatch(routeActions.getRouteById(routeId));
		}
	}, [dispatch, routeId, routeDataStatus]);

	useEffect(() => {
		if (route?.geometry) {
			setRouteLine({
				geometry: route.geometry,
				id: String(route.id),
			});
		}
	}, [route]);

	useEffect(() => {
		if (userRoute?.status === UserRouteStatus.ACTIVE) {
			setIsStarted(true);
		}
	}, [userRoute]);

	useEffect(() => {
		if (userRouteFinishDataStatus === DataStatus.FULFILLED) {
			navigate(GO_BACK_STEPS);
		}
	}, [userRouteFinishDataStatus, navigate]);

	if (
		routeDataStatus === DataStatus.PENDING ||
		routeDataStatus === DataStatus.IDLE
	) {
		return <Loader />;
	}

	if (!route) {
		return <div>Route not found</div>;
	}

	const [centerCoordinates] = route.geometry.coordinates;

	if (!centerCoordinates) {
		return <div>Invalid route coordinates</div>;
	}

	return (
		<div className={styles["container"]}>
			<MapProvider
				center={centerCoordinates}
				markers={markers}
				routeLine={routeLine}
			>
				<div className={styles["button-container"]}>
					{isStarted ? (
						<Button label="Finish" onClick={handleFinish} />
					) : (
						<Button label="Start" onClick={handleStart} />
					)}
				</div>
			</MapProvider>
		</div>
	);
};

export { UserRoute };
