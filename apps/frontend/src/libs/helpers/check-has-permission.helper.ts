import { type PermissionItemDto } from "~/modules/users/libs/types/types.js";

const checkHasPermission = (
	requiredPermissions: string[] | undefined,
	userPermissions: PermissionItemDto[],
): boolean => {
	if (!requiredPermissions?.length) {
		return true;
	}

	return requiredPermissions.some((permission) =>
		userPermissions.some((userPermission) => userPermission.key === permission),
	);
};

export { checkHasPermission };
