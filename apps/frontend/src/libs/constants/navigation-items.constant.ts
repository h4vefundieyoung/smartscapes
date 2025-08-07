import { AppRoute } from "~/libs/enums/enums.js";
import { type NavigationItem } from "~/libs/types/types.js";

const NAVIGATION_ITEMS: Record<string, NavigationItem[]> = {
	ADMIN: [
		{
			href: AppRoute.ROUTES,
			icon: "route",
			label: "Manage routes",
		},
		{
			href: AppRoute.CATEGORIES,
			icon: "tag",
			label: "Manage categories",
		},
		{
			href: AppRoute.CONTENT,
			icon: "message",
			label: "Content moderation",
		},
	],
	USER: [
		{
			href: AppRoute.APP,
			icon: "dashboard",
			label: "Dashboard",
		},
		{
			href: AppRoute.EXPLORE,
			icon: "map",
			label: "Explore",
		},
		{
			href: AppRoute.PROFILE,
			icon: "user",
			label: "Profile",
		},
	],
};

export { NAVIGATION_ITEMS };
