import { Carousel, TabContainer } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useEffect,
	useTabNavigation,
} from "~/libs/hooks/hooks.js";
import { actions as userRoutesActions } from "~/modules/user-routes/user-routes.js";

import { DASHBOARD_TABS } from "./libs/constants/dashboard-tabs.constant.js";
import styles from "./styles.module.css";

const Dashboard = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(userRoutesActions.getAllForCurrentUser());
	}, [dispatch]);

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
