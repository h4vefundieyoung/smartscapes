import { type TabItem } from "~/libs/components/tab-container/tab-container.js";
import {
	MyReviews,
	UserDetails,
} from "~/pages/profile/libs/components/components.js";

import { ProfileTabItemKey } from "../enums/enums.js";

const PROFILE_TABS: TabItem[] = [
	{
		element: <UserDetails />,
		id: ProfileTabItemKey.USER_DETAILS,
		label: "User details",
	},
	{
		element: <MyReviews />,
		id: ProfileTabItemKey.MY_REVIEWS,
		label: "My reviews",
	},
];

export { PROFILE_TABS };
