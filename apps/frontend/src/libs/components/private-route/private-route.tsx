import { Navigate } from "react-router";

import { AppRoute } from "~/libs/enums/app-route.enum.js";

import { RouterOutlet } from "../components.js";

const PrivateRoute = (): React.JSX.Element => {
	const isAuthentificated = false;

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!isAuthentificated) {
		return <Navigate replace to={AppRoute.SIGN_IN} />;
	}

	return <RouterOutlet />;
};

export { PrivateRoute };
