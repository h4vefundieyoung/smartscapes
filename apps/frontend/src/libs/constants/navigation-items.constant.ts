import { AppRoute } from "~/libs/enums/enums.js";
import { type NavigationItem } from "~/libs/types/types.js";

const NAVIGATION_ITEMS: NavigationItem[] = [
	{
		href: AppRoute.APP,
		icon: "dashboard",
		label: "Dashboard",
	},
	{
		href: AppRoute.SIGN_UP,
		icon: "analytics",
		label: "List of places",
	},
];

export { NAVIGATION_ITEMS };
