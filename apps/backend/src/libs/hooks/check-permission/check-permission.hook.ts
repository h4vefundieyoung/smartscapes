import { type PermissionKey } from "~/libs/enums/enums.js";
import { type APIPreHandler } from "~/libs/modules/controller/libs/types/types.js";
import { type ValueOf } from "~/libs/types/types.js";
import { AuthError } from "~/modules/auth/libs/exceptions/auth.exception.js";

import { PermissionError } from "./libs/exceptions/exceptions.js";

const checkHasPermission = (
	permissionKey: ValueOf<typeof PermissionKey>,
): APIPreHandler => {
	return ({ user }, done): void => {
		if (!user) {
			throw new AuthError();
		}

		if (
			!user.group.permissions.some(
				(permission) => permission.key === permissionKey,
			)
		) {
			throw new PermissionError();
		}

		done();
	};
};

export { checkHasPermission };
