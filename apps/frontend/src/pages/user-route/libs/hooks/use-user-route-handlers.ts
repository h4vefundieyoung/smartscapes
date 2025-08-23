import { DataStatus } from "~/libs/enums/enums.js";
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

const MOCK_LONGITUDE = 30.528;
const MOCK_LATITUDE = 50.455;
const GO_BACK_STEPS = -1;
const MOCK_COORDINATES: LineStringGeometry = {
	coordinates: [
		[MOCK_LONGITUDE, MOCK_LATITUDE],
		[MOCK_LONGITUDE, MOCK_LATITUDE],
	],
	type: "LineString",
} as const;

type UseUserRouteHandlers = {
	handleFinish: () => void;
	handleStart: () => void;
	isStarted: boolean;
};

const useUserRouteHandlers = (): UseUserRouteHandlers => {
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
			navigate(GO_BACK_STEPS);
		}
	}, [userRouteFinishDataStatus, navigate]);

	return {
		handleFinish,
		handleStart,
		isStarted,
	};
};

export { useUserRouteHandlers };
