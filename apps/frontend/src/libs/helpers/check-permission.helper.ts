import { type PermissionItemDto } from "~/modules/auth/libs/types/types.js";

const checkPermission = (
	requiredPermissions: string[] | undefined,
	userPermissions: PermissionItemDto[],
): boolean => {
	if (!requiredPermissions?.length) {
		return true;
	}

	return requiredPermissions.some((rp) =>
		userPermissions.some((up) => up.key === rp),
	);
};

export { checkPermission };
