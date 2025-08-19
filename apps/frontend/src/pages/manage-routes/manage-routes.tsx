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
			<PointsOfInterestTable />
		</main>
	);
};

export { ManageRoutes };
