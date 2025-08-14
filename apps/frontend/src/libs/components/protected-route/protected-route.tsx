import { Navigate } from "react-router";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { type PermissionKey } from "~/libs/enums/enums.js";
import { checkPermission } from "~/libs/helpers/helpers.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { NotFound } from "~/pages/not-found/not-found.js";

type Properties = {
	children: React.JSX.Element;
	protectedRoutePermissions?: ValueOf<typeof PermissionKey>[];
};

const ProtectedRoute = ({
	children,
	protectedRoutePermissions,
}: Properties): React.JSX.Element => {
	const { authenticatedUser, userPermissions } = useAppSelector(
		({ auth }) => auth,
	);

	const hasPermission = checkPermission(
		protectedRoutePermissions,
		userPermissions,
	);

	if (!authenticatedUser) {
		return <Navigate replace to={AppRoute.SIGN_IN} />;
	}

	if (!hasPermission) {
		return <NotFound />;
	}

	return <>{children}</>;
};

export { ProtectedRoute };
