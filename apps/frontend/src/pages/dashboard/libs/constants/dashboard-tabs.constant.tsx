import { type TabItem } from "~/libs/components/tab-container/tab-container.js";

import { SavedRoutes } from "../components/tabs/saved-routes/saved-routes.js";
import { UserHistory } from "../components/tabs/user-history/user-history.js";
import { DashboardTabsItemKey } from "../enums/enums.js";

const DASHBOARD_TABS: TabItem[] = [
	{
		element: <SavedRoutes />,
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
