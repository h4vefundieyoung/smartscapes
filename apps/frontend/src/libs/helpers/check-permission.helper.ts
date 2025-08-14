import { type PermissionItemDto } from "~/modules/auth/libs/types/types.js";

const checkPermission = (
	requiredPermissions: string[] | undefined,
	permissions: PermissionItemDto[],
): boolean => {
	if (!requiredPermissions?.length) {
		return true;
	}

	return requiredPermissions.some((rp) =>
		permissions.some((p) => p.key === rp),
	);
};

export { checkPermission };
