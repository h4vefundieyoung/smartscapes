import { type TabItem } from "~/libs/components/tab-container/tab-container.js";

import { UserHistory } from "../components/user-history.js";
import { DashboardTabItemKey } from "./dashboard-tabs-item.contant.js";

const DASHBOARD_TABS: TabItem[] = [
	{
		element: <></>,
		id: DashboardTabItemKey.SAVED_ROUTES,
		label: "Saved routes",
	},
	{
		element: <UserHistory />,
		id: DashboardTabItemKey.USER_HISTORY,
		label: "History",
	},
];

export { DASHBOARD_TABS };
