import { type RouteGetByIdResponseDto } from "@smartscapes/shared";
import { useParams } from "react-router";

import { Header, Loader } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { DataStatus } from "~/libs/enums/data-status.enum.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as routeActions } from "~/modules/routes/routes.js";

import { NotFound } from "../not-found/not-found.js";
import { ImageGallery } from "./libs/components/image-gallery/image-gallery.js";
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

	const data = useAppSelector(({ route }) => route.route);

	const dataStatus = useAppSelector(({ route }) => route.dataStatus);

	if (dataStatus === DataStatus.REJECTED) {
		return <NotFound />;
	}

	if (dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE) {
		return <Loader />;
	}

	const { description, name } = data as RouteGetByIdResponseDto;

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
			</main>
		</>
	);
};

export { RouteDetails };
