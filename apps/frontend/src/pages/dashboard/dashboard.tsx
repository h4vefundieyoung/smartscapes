import { Carousel, TabContainer } from "~/libs/components/components.js";
import { useTabNavigation } from "~/libs/hooks/hooks.js";

import { DASHBOARD_TABS } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Dashboard = (): React.JSX.Element => {
	const initialTabId = DASHBOARD_TABS[0]?.id ?? "";

	const { activeTabId, handleTabChange } = useTabNavigation(
		initialTabId,
		"dashboard-tab",
	);

	return (
		<main className={styles["container"]}>
			<div className={styles["components-container"]}>
				<div className={styles["text"]}>
					<h1 className={styles["label"]}>Dashboard</h1>
					<p className={styles["description"]}>
						Start saved routes and review your route history
					</p>
				</div>

				<TabContainer
					activeTabId={activeTabId}
					onTabChange={handleTabChange}
					tabsData={DASHBOARD_TABS}
				/>
			</div>
			<Carousel images={[""]} />
		</main>
	);
};

export { Dashboard };
