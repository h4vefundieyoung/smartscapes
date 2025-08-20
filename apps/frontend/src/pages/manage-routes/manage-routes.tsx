import {
	CreateRouteModal,
	DashboardHeading,
	PointsOfInterestTable,
} from "./libs/components/components.js";
import styles from "./styles.module.css";

const ManageRoutes = (): React.JSX.Element => {
	return (
		<main className={styles["container"]}>
			<DashboardHeading
				subtitle="Manage points of interest and routes."
				title="Dashboard"
			/>
			<PointsOfInterestTable />

			<section>
				<h2>Routes</h2>
				<div>
					<CreateRouteModal />
				</div>
			</section>
		</main>
	);
};

export { ManageRoutes };
