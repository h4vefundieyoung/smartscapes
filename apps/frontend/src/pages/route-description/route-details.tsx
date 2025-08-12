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
import { ImagesSection } from "./libs/components/images-section/images-section.js";
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

	const data = useAppSelector(({ route }) => route.data);

	const dataStatus = useAppSelector(({ route }) => route.dataStatus);

	if (dataStatus === DataStatus.REJECTED) {
		return <NotFound />;
	}

	if (dataStatus === DataStatus.FULFILLED) {
		const { description, name } = data as RouteGetByIdResponseDto;

		return (
			<main>
				<Header
					actions={[{ label: "Sign in", to: AppRoute.SIGN_IN }]}
					user={authenticatedUser}
				/>
				<div className={styles["container"]}>
					<label className={styles["label"]}>{name}</label>
					<ImagesSection />
					<p className={styles["description"]}>{description}</p>
				</div>
			</main>
		);
	}

	return <Loader />;
};

export { RouteDetails };
