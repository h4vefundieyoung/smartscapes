import { type JSX } from "react";

import appLogo from "~/assets/images/logo.svg";
import { AppRoute } from "~/libs/enums/enums.js";

import { Button, Link } from "../components.js";
import { AuthenticatedHeader } from "./authenticated-header.js";
import { type User } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	user: null | User;
};

const Header = ({ user }: Properties): JSX.Element => {
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
			{user ? (
				<AuthenticatedHeader user={user} />
			) : (
				<div className={styles["buttons"]}>
					<Button label="Sign up" to={AppRoute.SIGN_UP} type="button" />
					<Button label="Sign in" to={AppRoute.SIGN_IN} type="button" />
				</div>
			)}
		</header>
	);
};

export { Header };
