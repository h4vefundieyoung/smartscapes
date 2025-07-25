import { type JSX } from "react";

import appLogo from "~/assets/images/logo.svg";
import { AppRoute } from "~/libs/enums/enums.js";

import { Avatar, Button } from "../components.js";
import { type User } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	user: null | User;
};

const Header = ({ user }: Properties): JSX.Element => {
	const hasUser = Boolean(user);

	return (
		<header className={styles["header"]}>
			<img alt="SmartScapes Logo" height={24} src={appLogo} width={136} />
			{hasUser ? (
				<div className={styles["user-info"]}>
					{user && <Avatar user={user} />}
					<div className={styles["name"]}>
						{user?.firstName} {user?.lastName}
					</div>
				</div>
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
