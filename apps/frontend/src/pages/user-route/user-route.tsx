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
import {
	actions as userRouteActions,
	UserRouteStatus,
} from "~/modules/user-routes/user-routes.js";

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

	const {
		route,
		routeDataStatus,
		user,
		userRoute,
		userRouteDataStatus,
		userRouteFinishDataStatus,
	} = useAppSelector(({ auth, routeDetails, userRoute }) => ({
		route: routeDetails.route,
		routeDataStatus: routeDetails.dataStatus,
		user: auth.authenticatedUser,
		userRoute: userRoute.userRoute,
		userRouteDataStatus: userRoute.dataStatus,
		userRouteFinishDataStatus: userRoute.finishStatus,
	}));

	const { markers } = useRouteMarker({ route });

	const { handleFinish, handleStart } = useUserRouteHandler(
		user,
		routeId,
		route,
	);

	useEffect(() => {
		if (routeDataStatus === DataStatus.IDLE) {
			void dispatch(routeActions.getById(routeId));
		}
	}, [dispatch, routeId, routeDataStatus]);

	useEffect(() => {
		if (user && userRouteDataStatus === DataStatus.IDLE) {
			void dispatch(userRouteActions.getByUserId(user.id));
		}
	}, [dispatch, user, userRouteDataStatus]);

	useEffect(() => {
		if (route) {
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

	return (
		<div className={styles["container"]}>
			<MapProvider markers={markers} routeLine={routeLine}>
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
