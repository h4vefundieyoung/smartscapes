import { Button, Loader, MapProvider } from "~/libs/components/components.js";
import { useAppSelector, useParams } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import {
	useRouteMarker,
	useUserRouteHandler,
	useUserRouteNavigation,
	useUserRouteState,
} from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

const UserRoute = (): React.JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const routeId = Number(id);
	const user = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	) as UserAuthResponseDto;

	const { isRouteLoading, isUserRouteActive, isUserRouteCompleted, route } =
		useUserRouteState({ routeId, user });

	const { handleFinish, handleStart } = useUserRouteHandler(
		user,
		routeId,
		route,
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
