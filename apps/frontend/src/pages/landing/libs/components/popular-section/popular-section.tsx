import { Loader, RouteCard } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppNavigate,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as routesActions } from "~/modules/routes/routes.js";

import styles from "./styles.module.css";

const PopularSection = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useAppNavigate();

	const dataStatus = useAppSelector(({ routes }) => routes.dataStatus);
	const routes = useAppSelector(({ routes }) => routes.data);

	const handleClick = useCallback(
		(id: number): void => {
			const routeDetailsLink = configureString(AppRoute.ROUTES_$ID, {
				id: id.toString(),
			});

			navigate(routeDetailsLink);
		},
		[navigate],
	);

	useEffect(() => {
		void dispatch(routesActions.getAll({ page: 1, perPage: 10 }));
	}, [dispatch]);

	if (dataStatus === DataStatus.PENDING) {
		return <Loader />;
	}

	return (
		<section className={styles["section"]}>
			<div className={styles["container"]}>
				<h2 className={styles["title"]}>Popular routes</h2>
				<ul className={styles["cards"]}>
					{routes.map((route) => (
						<RouteCard key={route.id} onClick={handleClick} route={route} />
					))}
				</ul>
			</div>
		</section>
	);
};

export { PopularSection };
