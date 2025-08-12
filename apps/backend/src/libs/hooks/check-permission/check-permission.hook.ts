import { type APIPreHandler } from "~/libs/modules/controller/libs/types/types.js";
import { AuthError } from "~/modules/auth/libs/exceptions/auth.exception.js";

import { PermissionError } from "./libs/exceptions/exceptions.js";

const checkPermission = (requiredPermission: string): APIPreHandler => {
	return ({ user }, done): void => {
		if (!user) {
			throw new AuthError();
		}

		const userPermissions = user.group.permissions.map(
			(permission) => permission.key,
		);

		if (!userPermissions.includes(requiredPermission)) {
			throw new PermissionError();
		}

		done();
	};
};

export { checkPermission };
