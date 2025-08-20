import image1 from "~/assets/images/route-details/placeholder-image-1.png";
import image2 from "~/assets/images/route-details/placeholder-image-2.png";
import image3 from "~/assets/images/route-details/placeholder-image-3.png";
import { ImageGallery, Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
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
import { RouteReviews } from "~/pages/route-description/libs/components/components.js";

import { NotFound } from "../not-found/not-found.js";
import styles from "./styles.module.css";

const RouteDetails = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const { id } = useParams<{ id: string }>();

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

	const { description, id: routeId, name } = route as RouteGetByIdResponseDto;

	return (
		<>
			<main className={styles["container"]}>
				<h1 className={styles["label"]}>{name}</h1>
				<ImageGallery images={[image1, image2, image3]} />
				<p className={styles["description"]}>{description}</p>
				<RouteReviews routeId={Number(routeId)} />
			</main>
		</>
	);
};

export { RouteDetails };
