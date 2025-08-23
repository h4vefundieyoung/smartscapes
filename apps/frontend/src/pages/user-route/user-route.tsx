import { Button } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppNavigate,
	useAppSelector,
	useCallback,
	useEffect,
	useParams,
	useState,
} from "~/libs/hooks/hooks.js";
import { type LineStringGeometry } from "~/libs/types/types.js";
import { actions as userRouteActions } from "~/modules/user-routes/user-routes.js";

import styles from "./styles.module.css";

const MOCK_LONGITUDE = 30.528;
const MOCK_LATITUDE = 50.455;
const MOCK_COORDINATES: LineStringGeometry = {
	coordinates: [
		[MOCK_LONGITUDE, MOCK_LATITUDE],
		[MOCK_LONGITUDE, MOCK_LATITUDE],
	],
	type: "LineString",
} as const;

const UserRoute = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useAppNavigate();
	const { id: routeId } = useParams<{ id: string }>();
	const { user } = useAppSelector(({ auth }) => ({
		user: auth.authenticatedUser,
	}));

	const userRouteFinishDataStatus = useAppSelector(
		({ userRoute }) => userRoute.finishStatus,
	);

	const [isStarted, setIsStarted] = useState<boolean>(false);

	const handleStart = useCallback(() => {
		if (!user || !routeId) {
			return;
		}

		void dispatch(
			userRouteActions.start({
				payload: {
					routeId: Number(routeId),
				},
				userId: user.id,
			}),
		);

		setIsStarted(true);
	}, [dispatch, routeId, user]);

	const handleFinish = useCallback(() => {
		if (!user || !routeId) {
			return;
		}

		void dispatch(
			userRouteActions.finish({
				payload: {
					actualGeometry: MOCK_COORDINATES,
					routeId: Number(routeId),
				},
				userId: user.id,
			}),
		);

		setIsStarted(false);
	}, [dispatch, routeId, user]);

	useEffect(() => {
		if (userRouteFinishDataStatus === DataStatus.FULFILLED) {
			navigate(AppRoute.ROUTES_$ID.replace(":id", String(routeId)));
		}
	}, [userRouteFinishDataStatus, navigate, routeId]);

	return (
		<div className={styles["container"]}>
			<div className={styles["button-container"]}>
				{isStarted ? (
					<Button label="Finish" onClick={handleFinish} />
				) : (
					<Button label="Start" onClick={handleStart} />
				)}
			</div>
		</div>
	);
};

export { UserRoute };
