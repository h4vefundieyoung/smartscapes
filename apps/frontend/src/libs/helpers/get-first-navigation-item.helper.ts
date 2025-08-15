import {
	type NavigationItem,
	type NavigationItemsGroup,
} from "~/libs/types/types.js";
import { type PermissionItemDto } from "~/modules/auth/libs/types/types.js";

import { checkPermission } from "./helpers.js";

const getFirstNavigationItems = (
	itemsGroup: NavigationItemsGroup,
	userItemPermissions: PermissionItemDto[] = [],
): NavigationItem | undefined => {
	return (
		itemsGroup.items.find(
			({ userPermissions = [] }) =>
				userPermissions.length > 0 &&
				checkPermission(userPermissions, userItemPermissions),
		) ?? itemsGroup.items[0]
	);
};

export { getFirstNavigationItems };
