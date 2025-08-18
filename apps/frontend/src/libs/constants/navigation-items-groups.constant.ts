import { AppRoute, PermissionKey } from "~/libs/enums/enums.js";
import { type NavigationItemsGroup } from "~/libs/types/types.js";

const NAVIGATION_ITEMS_GROUPS: NavigationItemsGroup[] = [
	{
		hasLabel: true,
		items: [
			{
				href: AppRoute.ROUTES,
				icon: "route",
				label: "Manage routes",
				pagePermissions: [PermissionKey.MANAGE_ROUTES],
			},
		],
		name: "Administration",
	},
	{
		hasLabel: false,
		items: [
			{
				href: AppRoute.DASHBOARD,
				icon: "dashboard",
				label: "Dashboard",
			},
			{
				href: AppRoute.EXPLORE,
				icon: "map",
				isPagePublic: true,
				label: "Explore",
			},
			{
				href: AppRoute.PROFILE,
				icon: "user",
				label: "Profile",
			},
		],
		name: "Application",
	},
];

export { NAVIGATION_ITEMS_GROUPS };
