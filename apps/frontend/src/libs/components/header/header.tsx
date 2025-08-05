import { type JSX } from "react";

import appLogo from "~/assets/images/logo.svg";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector, useLocation } from "~/libs/hooks/hooks.js";

import { Avatar, Button, Link } from "../components.js";
import styles from "./styles.module.css";

const Header = (): JSX.Element => {
	const { pathname } = useLocation();
	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);

	const renderHeaderContent = (): React.JSX.Element => {
		if (pathname === AppRoute.ROOT) {
			return (
				<div className={styles["buttons"]}>
					<Button label="Explore" to={AppRoute.APP} type="button" />
				</div>
			);
		}

		if (authenticatedUser) {
			return (
				<div className={styles["user-info"]}>
					<Avatar user={authenticatedUser} />
					<div className={styles["name"]}>
						{authenticatedUser.firstName} {authenticatedUser.lastName}
					</div>
				</div>
			);
		}

		return (
			<div className={styles["buttons"]}>
				<Button label="Sign in" to={AppRoute.SIGN_IN} type="button" />
			</div>
		);
	};

	return (
		<header className={styles["header"]}>
			<Link to={AppRoute.ROOT}>
				<img
					alt="SmartScapes Logo"
					className={styles["header-logo"]}
					height={24}
					src={appLogo}
					width={136}
				/>
			</Link>
			{renderHeaderContent()}
		</header>
	);
};

export { Header };
