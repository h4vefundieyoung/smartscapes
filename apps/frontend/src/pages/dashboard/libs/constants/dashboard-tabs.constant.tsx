import { type TabItem } from "~/libs/components/tab-container/tab-container.js";

import { UserHistory } from "../components/user-history.js";

const DASHBOARD_TABS: TabItem[] = [
	{
		element: <></>,
		id: "saved-routes",
		label: "Saved routes",
	},
	{
		element: <UserHistory />,
		id: "history",
		label: "History",
	},
];

export { DASHBOARD_TABS };
