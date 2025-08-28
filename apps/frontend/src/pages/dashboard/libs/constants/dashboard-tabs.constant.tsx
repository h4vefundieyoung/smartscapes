import { type TabItem } from "~/libs/components/tab-container/tab-container.js";

import { UserHistory } from "../components/user-history.js";
import { DashboardTabsItemKey } from "../enums/enums.js";

const DASHBOARD_TABS: TabItem[] = [
	{
		element: <></>,
		id: DashboardTabsItemKey.SAVED_ROUTES,
		label: "Saved routes",
	},
	{
		element: <UserHistory />,
		id: DashboardTabsItemKey.USER_HISTORY,
		label: "History",
	},
];

export { DASHBOARD_TABS };
