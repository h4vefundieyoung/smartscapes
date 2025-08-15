import { type NavigationItemsGroup } from "~/libs/types/types.js";
import { type PermissionItemDto } from "~/modules/users/libs/types/types.js";

import { checkPermission } from "./helpers.js";

const getPermittedNavigationItems = (
	navigationGroups: NavigationItemsGroup[],
	userPermissions: PermissionItemDto[],
): NavigationItemsGroup[] => {
	return navigationGroups
		.map((group) => ({
			...group,
			items: group.items.filter((item) =>
				checkPermission(item.pagePermissions, userPermissions),
			),
		}))
		.filter((group) => group.items.length > 0);
};

export { getPermittedNavigationItems };
