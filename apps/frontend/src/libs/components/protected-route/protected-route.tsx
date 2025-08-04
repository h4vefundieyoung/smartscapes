import { Navigate, Outlet } from "react-router";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

const ProtectedRoute = (): React.JSX.Element => {
	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);

	const isAuthenticated = Boolean(authenticatedUser);

	return isAuthenticated ? (
		<Outlet />
	) : (
		<Navigate replace to={AppRoute.SIGN_IN} />
	);
};

export { ProtectedRoute };
