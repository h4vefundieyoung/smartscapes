import { GroupKey, type NavigationItemsGroup } from "~/libs/types/types.js";
import {
	type GroupResponseDto,
	type PermissionItemDto,
} from "~/modules/auth/libs/types/types.js";

import { checkPermission } from "./helpers.js";

const selectNavigationItems = (
	navigationGroups: NavigationItemsGroup[],
	userGroup: GroupResponseDto | null,
	userPermissions: PermissionItemDto[],
): NavigationItemsGroup[] => {
	return navigationGroups
		.filter(
			(group) =>
				group.groupKey !== GroupKey.ADMINS ||
				userGroup?.key === GroupKey.ADMINS,
		)
		.map((group) => ({
			...group,
			items: group.items.filter((item) =>
				checkPermission(item.userPermissions, userPermissions),
			),
		}))
		.filter((group) => group.items.length > 0);
};

export { selectNavigationItems };
