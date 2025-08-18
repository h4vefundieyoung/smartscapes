import { Header, Loader } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useParams,
} from "~/libs/hooks/hooks.js";
import {
	actions as routeActions,
	type RouteGetByIdResponseDto,
} from "~/modules/routes/routes.js";
import { NotFound } from "~/pages/not-found/not-found.jsx";

import {
	ImageGallery,
	PointOfInterestSection,
} from "./libs/components/components.js";
import { type PointOfInterestDetails } from "./libs/types/types.js";
import styles from "./styles.module.css";

const RouteDetails = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const { id } = useParams<{ id: string }>();

	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);

	useEffect(() => {
		void dispatch(routeActions.getRouteById(Number(id)));
	}, [dispatch, id]);

	const route = useAppSelector(({ route }) => route.route);

	const dataStatus = useAppSelector(({ route }) => route.dataStatus);

	if (dataStatus === DataStatus.REJECTED) {
		return <NotFound />;
	}

	if (dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE) {
		return <Loader />;
	}

	const { description, name, pois } = route as RouteGetByIdResponseDto;

	return (
		<>
			<Header
				actions={[{ label: "Sign in", to: AppRoute.SIGN_IN }]}
				user={authenticatedUser}
			/>
			<main className={styles["container"]}>
				<h1 className={styles["label"]}>{name}</h1>
				<ImageGallery />
				<p className={styles["description"]}>{description}</p>
				<PointOfInterestSection
					pointOfInterests={pois as PointOfInterestDetails[]}
				/>
			</main>
		</>
	);
};

export { RouteDetails };
