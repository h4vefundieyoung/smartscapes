import { Button, Loader, MapProvider } from "~/libs/components/components.js";
import { useParams } from "~/libs/hooks/hooks.js";
import { type LineStringGeometry } from "~/libs/types/types.js";

import {
	useRouteMapData,
	useRouteState,
	useUserRouteHandler,
	useUserRouteNavigation,
	useUserRouteState,
} from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

const LATITUDE = 50.455;
const LONGITUDE = 30.528;

const mockActualGeometry: LineStringGeometry = {
	coordinates: [
		[LONGITUDE, LATITUDE],
		[LONGITUDE, LATITUDE],
	],
	type: "LineString",
};

const UserRoute = (): React.JSX.Element => {
	const { routeId } = useParams<{ routeId: string }>();

	const { isRouteLoading } = useRouteState();
	const { isUserRouteActive, isUserRouteCompleted, isUserRouteLoading } =
		useUserRouteState(Number(routeId));

	const { handleFinish, handleStart } = useUserRouteHandler(
		Number(routeId),
		mockActualGeometry,
	);

	const { markers, routeLine } = useRouteMapData(Number(routeId));

	useUserRouteNavigation({ isUserRouteCompleted });

	const isLoading = isRouteLoading || isUserRouteLoading;

	return (
		<div className={styles["container"]}>
			{isLoading ? (
				<div className={styles["loader-container"]}>
					<Loader />
				</div>
			) : (
				<MapProvider markers={markers} routeLine={routeLine}>
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

export { UserRoute };
