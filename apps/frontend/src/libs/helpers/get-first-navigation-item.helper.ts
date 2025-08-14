import {
	type NavigationItem,
	type NavigationItemsGroup,
} from "~/libs/types/types.js";
import { type PermissionItemDto } from "~/modules/auth/libs/types/types.js";

import { checkPermission } from "./helpers.js";

const FIRST_ITEM = 0;

const getFirstNavigationItems = (
	itemsGroup: NavigationItemsGroup,
	userItemPermissions: PermissionItemDto[] = [],
): NavigationItem | undefined => {
	return (
		itemsGroup.items.find(
			({ userPermissions = [] }) =>
				userPermissions.length > FIRST_ITEM &&
				checkPermission(userPermissions, userItemPermissions),
		) ?? itemsGroup.items[FIRST_ITEM]
	);
};

export { getFirstNavigationItems };
