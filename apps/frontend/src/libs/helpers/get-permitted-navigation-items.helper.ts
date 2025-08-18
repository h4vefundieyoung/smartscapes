import { type NavigationItemsGroup } from "~/libs/types/types.js";
import { type PermissionItemDto } from "~/modules/users/libs/types/types.js";

import { checkHasPermission } from "./helpers.js";

const getPermittedNavigationItems = (
	hasAuthenticatedUser: boolean,
	navigationGroups: NavigationItemsGroup[],
	userPermissions: PermissionItemDto[],
): NavigationItemsGroup[] => {
	const result: NavigationItemsGroup[] = [];

	for (const group of navigationGroups) {
		const items = group.items.filter((item) => {
			if (!item.isPagePublic && !hasAuthenticatedUser) {
				return false;
			}

			return checkHasPermission(item.pagePermissions ?? [], userPermissions);
		});

		if (items.length > 0) {
			result.push({ ...group, items });
		}
	}

	return result;
};

export { getPermittedNavigationItems };
