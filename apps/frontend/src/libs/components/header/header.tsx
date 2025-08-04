import { type JSX } from "react";

import appLogo from "~/assets/images/logo.svg";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector, useLocation } from "~/libs/hooks/hooks.js";

import { Avatar, Button, Link } from "../components.js";
import { type User } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	user: null | User;
};

const Header = ({ user }: Properties): JSX.Element => {
	const { pathname } = useLocation();
	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);
	const hasUser = Boolean(authenticatedUser);

	const renderHeaderContent = (): React.JSX.Element => {
		if (pathname === AppRoute.ROOT) {
			return (
				<div className={styles["buttons"]}>
					<Button label="Explore" to={AppRoute.APP} type="button" />
				</div>
			);
		}

		if (hasUser) {
			return (
				<div className={styles["user-info"]}>
					{user && <Avatar user={user} />}
					<div className={styles["name"]}>
						{user?.firstName} {user?.lastName}
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
