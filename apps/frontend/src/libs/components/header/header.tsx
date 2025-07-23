import { type JSX } from "react";

import appLogo from "~/assets/images/logo.svg";
import { AppRoute } from "~/libs/enums/enums.js";

import { Avatar, Button, Link } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	user: null | User;
};

type User = {
	avatarUrl: null | string;
	firstName: string;
	lastName: string;
};

const Header = ({ user }: Properties): JSX.Element => {
	if (!user) {
		return (
			<header className={styles["header"]}>
				<div className={styles["logo"]}>
					<img
						alt="SmartScapes Logo"
						className={styles["logoIcon"]}
						src={appLogo}
					/>
				</div>
				<div className={styles["buttons"]}>
					<Link to={AppRoute.SIGN_UP}>
						<Button label="Sign up" type="button" />
					</Link>
					<Link to={AppRoute.SIGN_IN}>
						<Button label="Sign in" type="button" />
					</Link>
				</div>
			</header>
		);
	}

	return (
		<header className={styles["header"]}>
			<div className={styles["logo"]}>
				<img
					alt="SmartScapes Logo"
					className={styles["logoIcon"]}
					src={appLogo}
				/>
			</div>
			<div className={styles["userInfo"]}>
				<Avatar user={user} />
				<div className={styles["name"]}>
					{user.firstName} {user.lastName}
				</div>
			</div>
		</header>
	);
};

export { Header };
