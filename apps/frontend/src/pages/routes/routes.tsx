import { Button, CreateRouteForm } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppDispatch, useCallback, useModal } from "~/libs/hooks/hooks.js";
import {
	type RouteCreateRequestDto,
	actions as routesActions,
} from "~/modules/routes/routes.js";

import styles from "./styles.module.css";

const Routes = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const handleRouteSubmit = useCallback(
		(payload: RouteCreateRequestDto): void => {
			void dispatch(routesActions.create(payload));
		},
		[dispatch],
	);

	const { handleModalOpen } = useModal({
		component: <CreateRouteForm onSubmit={handleRouteSubmit} />,
		queryParameter: "create-route",
	});

	return (
		<main className={styles["main"]}>
			Routes Page
			<Button
				label="Create new route"
				onClick={handleModalOpen}
				type="button"
			/>
			<Button label="Back to app" to={AppRoute.APP} />
		</main>
	);
};

export { Routes };
