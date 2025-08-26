import { Button, Loader, MapProvider } from "~/libs/components/components.js";
import { useParams } from "~/libs/hooks/hooks.js";

import {
	useRouteMapProperties,
	useRouteState,
	useUserRouteHandler,
	useUserRouteNavigation,
	useUserRouteState,
} from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

const UserRoute = (): React.JSX.Element => {
	const { routeId } = useParams<{ routeId: string }>();

	const { isRouteLoading } = useRouteState();
	const { isUserRouteActive, isUserRouteCompleted, isUserRouteLoading } =
		useUserRouteState(Number(routeId));

	const { handleFinish, handleStart } = useUserRouteHandler(Number(routeId));

	const mapProperties = useRouteMapProperties(Number(routeId));

	useUserRouteNavigation({ isUserRouteCompleted });

	const isLoading = isRouteLoading || isUserRouteLoading;

	return (
		<div className={styles["container"]}>
			{isLoading || !mapProperties ? (
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

export { UserRoute };
