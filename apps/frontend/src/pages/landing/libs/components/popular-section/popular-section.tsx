import { Loader, RouteCard } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as routesActions } from "~/modules/routes/routes.js";

import styles from "./styles.module.css";

const PopularSection = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const dataStatus = useAppSelector(({ routes }) => routes.dataStatus);
	const routes = useAppSelector(({ routes }) => routes.data);

	useEffect(() => {
		void dispatch(routesActions.getAll({ categories: "popular" }));
	}, [dispatch]);

	if (dataStatus === DataStatus.PENDING) {
		return <Loader />;
	}

	return (
		<section className={styles["section"]}>
			<div className={styles["container"]}>
				<h2 className={styles["title"]}>Popular routes</h2>
				<ul className={styles["cards"]}>
					{routes.map(({ geometry, id, images, name, pois }) => (
						<RouteCard
							id={id}
							imageUrl={images.at(0)?.url ?? null}
							key={id}
							mapProps={{
								markers: pois.map((poi) => ({
									coordinates: poi.location.coordinates,
								})),
								routeLine: { geometry, id: String(id) },
							}}
							name={name}
						/>
					))}
				</ul>
			</div>
		</section>
	);
};

export { PopularSection };
