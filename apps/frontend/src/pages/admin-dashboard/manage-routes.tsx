import {
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
			<h2 className={styles["table-title"]}>Points of interest</h2>
			<PointsOfInterestTable />
		</main>
	);
};

export { ManageRoutes };
