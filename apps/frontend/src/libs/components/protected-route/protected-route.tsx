import { Navigate } from "react-router";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { DataStatus } from "~/libs/enums/data-status.enum.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { Loader } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.JSX.Element;
};

const ProtectedRoute = ({ children }: Properties): React.JSX.Element => {
	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);
	const authDataStatus = useAppSelector(({ auth }) => auth.dataStatus);
	const isLoading = authDataStatus === DataStatus.PENDING;

	if (isLoading) {
		return (
			<div className={styles["loader-container"]}>
				<Loader />
			</div>
		);
	}

	if (!authenticatedUser) {
		return <Navigate replace to={AppRoute.SIGN_IN} />;
	}

	return <>{children}</>;
};

export { ProtectedRoute };
