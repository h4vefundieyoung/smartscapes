import { PageHeading } from "~/libs/components/components.js";

import {
	PointsOfInterestTable,
	RoutesTable,
} from "./libs/components/components.js";
import styles from "./styles.module.css";

const ManageRoutes = (): React.JSX.Element => {
	return (
		<main className={styles["container"]}>
			<PageHeading
				subtitle="Manage points of interest and routes."
				title="Manage routes"
			/>

			<div className={styles["sections"]}>
				<PointsOfInterestTable />
				<RoutesTable />
			</div>
		</main>
	);
};

export { ManageRoutes };
