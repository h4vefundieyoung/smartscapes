import { Button, Loader, MapProvider } from "~/libs/components/components.js";
import { useParams } from "~/libs/hooks/hooks.js";
import { type LineStringGeometry } from "~/libs/types/types.js";

import {
	useRouteMarker,
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
	const { id } = useParams<{ id: string }>();
	const routeId = Number(id);

	const { isRouteLoading, isUserRouteActive, isUserRouteCompleted, route } =
		useUserRouteState({ routeId });

	const { handleFinish, handleStart } = useUserRouteHandler(
		routeId,
		mockActualGeometry,
	);

	const markers = useRouteMarker(route.pois);

	const routeLine = {
		geometry: route.geometry,
		id: String(route.id),
	};

	useUserRouteNavigation({ isUserRouteCompleted });

	return (
		<div className={styles["container"]}>
			<MapProvider markers={markers} routeLine={routeLine}>
				{isRouteLoading ? (
					<div className={styles["loader-container"]}>
						<Loader />
					</div>
				) : (
					<div className={styles["button-container"]}>
						{isUserRouteActive ? (
							<Button label="Finish" onClick={handleFinish} />
						) : (
							<Button label="Start" onClick={handleStart} />
						)}
					</div>
				)}
			</MapProvider>
		</div>
	);
};

export { UserRoute };
